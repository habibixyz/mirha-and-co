#!/usr/bin/env python3
"""
Mirha & Co. — Production-Grade Python SDK & CLI Client

A robust command-line client and integration utility for the Mirha Skincare Intelligence API.
Handles automatic retries with exponential backoff, rate limits (HTTP 429), timeouts, and multi-format outputs.

Usage:
    python mirha_client.py --api-key b2b_trial_key --postal London --skin oily --concern acne
"""

import argparse
import sys
import json
import time
import urllib.request
import urllib.error
from datetime import datetime

DEFAULT_LIVE_URL = "https://www.mirhaandco.com/api/v1/recommend"

class MirhaAPIClient:
    """Production-grade API Client wrapper with retry mechanisms, timeout controls, and structured error handling."""
    
    def __init__(self, api_key, api_url=DEFAULT_LIVE_URL, timeout=15, max_retries=3):
        self.api_key = api_key
        self.api_url = api_url
        self.timeout = timeout
        self.max_retries = max_retries

    def get_recommendation(self, postal_code, skin_type, main_concern, budget="under_1000", catalog=None):
        """
        Queries the recommendation API with resilient retry logic.
        Handles status 429 (rate-limiting) by reading the Retry-After header.
        """
        payload = {
            "apiKey": self.api_key,
            "postalCode": postal_code,
            "skinType": skin_type,
            "mainConcern": main_concern,
            "budget": budget
        }
        if catalog:
            payload["catalog"] = catalog

        data = json.dumps(payload).encode("utf-8")
        
        attempt = 0
        backoff_delay = 1.0  # Seconds
        
        while attempt <= self.max_retries:
            req = urllib.request.Request(
                self.api_url,
                data=data,
                headers={
                    "Content-Type": "application/json",
                    "User-Agent": "MirhaPythonSDK/1.0"
                },
                method="POST"
            )
            
            try:
                with urllib.request.urlopen(req, timeout=self.timeout) as response:
                    status_code = response.getcode()
                    response_body = response.read().decode("utf-8")
                    return status_code, json.loads(response_body)
                    
            except urllib.error.HTTPError as e:
                # Retrieve rates or limits warning if available
                error_body = e.read().decode("utf-8")
                
                # Check for rate limits (429) and honor Retry-After if present
                if e.code == 429:
                    retry_after = e.headers.get("Retry-After")
                    if retry_after:
                        try:
                            wait_time = float(retry_after)
                        except ValueError:
                            wait_time = 5.0
                    else:
                        wait_time = backoff_delay
                    
                    attempt += 1
                    if attempt <= self.max_retries:
                        print(f"[!] Rate limited (429). Retrying in {wait_time}s (Attempt {attempt}/{self.max_retries})...", file=sys.stderr)
                        time.sleep(wait_time)
                        continue
                
                try:
                    return e.code, json.loads(error_body)
                except Exception:
                    return e.code, {"success": False, "error": e.reason or f"HTTP Error {e.code}"}
                    
            except urllib.error.URLError as e:
                # Catch-all connection issues
                attempt += 1
                if attempt <= self.max_retries:
                    print(f"[!] Connection failed: {e.reason}. Retrying in {backoff_delay}s (Attempt {attempt}/{self.max_retries})...", file=sys.stderr)
                    time.sleep(backoff_delay)
                    backoff_delay *= 2  # Exponential backoff
                    continue
                return 500, {"success": False, "error": f"Connection Refused or Host Unreachable: {e.reason}"}
                
            except Exception as e:
                return 500, {"success": False, "error": str(e)}

        return 500, {"success": False, "error": "Maximum retry limit exceeded"}


def print_formatted_report(res, status):
    """Prints a beautiful, terminal-safe ASCII clinical telemetry report."""
    if status != 200 or not res.get("success"):
        print("\n[!] API Error Response:", file=sys.stderr)
        print(json.dumps(res, indent=2), file=sys.stderr)
        return False
        
    diag = res.get("diagnostics", {})
    recs = res.get("recommendation", {})
    quota = res.get("quota", {})
    
    print("\n" + "="*60)
    print(" MIRHA & CO. CLINICAL TELEMETRY REPORT")
    print("="*60)
    print(f"Location:           {diag.get('location')}")
    print(f"Water Hardness:     {diag.get('waterHardnessPpm')} PPM ({diag.get('waterHardnessCategory')})")
    print(f"Temperature:        {diag.get('temperatureC')} deg C")
    print(f"Humidity:           {diag.get('humidityPercent')}%")
    print(f"TEWL Barrier Risk:  {diag.get('environmentalStress', {}).get('tewlRiskLevel')}")
    print(f"Mineral Scum Risk:  {diag.get('environmentalStress', {}).get('mineralScumRiskLevel')}")
    
    print("\nRECOMMENDED CLINICAL ROUTINE:")
    print("-"*60)
    for step_name, step_data in recs.items():
        if step_data and isinstance(step_data, dict):
            print(f"* [{step_name.upper()}]")
            print(f"  Product: {step_data.get('name')}")
            print(f"  Reason:  {step_data.get('reason')}")
            print()
            
    print("="*60)
    print(f"Quota Remaining:    {quota.get('remaining')} / {quota.get('monthlyQuota')}")
    print("="*60 + "\n")
    return True


def main():
    parser = argparse.ArgumentParser(description="Mirha & Co. B2B Skincare API Resilient CLI Client")
    
    parser.add_argument("--api-key", default="b2b_trial_key", help="Your B2B API Key (default: b2b_trial_key)")
    parser.add_argument("--url", default=DEFAULT_LIVE_URL, help=f"Target URL (default: {DEFAULT_LIVE_URL})")
    
    parser.add_argument("--postal", default="London", help="Postal code or city (default: London)")
    parser.add_argument("--skin", default="oily", choices=["oily", "dry", "combination", "sensitive"], help="Skin type")
    parser.add_argument("--concern", default="acne", choices=["acne", "pigmentation", "dullness", "dehydration"], help="Skin concern")
    
    parser.add_argument("--format", default="text", choices=["text", "json"], help="Output display format (default: text)")
    parser.add_argument("--timeout", type=int, default=15, help="HTTP Request timeout in seconds")
    parser.add_argument("--retries", type=int, default=3, help="Max retry count for flaky networks")
    
    args = parser.parse_args()
    
    client = MirhaAPIClient(
        api_key=args.api_key,
        api_url=args.url,
        timeout=args.timeout,
        max_retries=args.retries
    )
    
    status, res = client.get_recommendation(
        postal_code=args.postal,
        skin_type=args.skin,
        main_concern=args.concern
    )
    
    if args.format == "json":
        print(json.dumps(res, indent=2))
        if status != 200:
            sys.exit(1)
    else:
        success = print_formatted_report(res, status)
        if not success:
            sys.exit(1)

if __name__ == "__main__":
    main()
