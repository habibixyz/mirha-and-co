# Mirha & Co. Python SDK & CLI tool

This folder contains a production-ready, zero-dependency Python script designed for B2B integration testing, automated batch queries, and CLI-based telemetry retrievals.

---

## Features
- **Zero External Dependencies**: Powered entirely by Python's built-in standard library (`urllib`, `json`, `argparse`). Works out-of-the-box on clean installations.
- **Resilient Core Engine**: Built-in exponential backoff retry parameters and configurable timeouts.
- **Rate Limit Resilience**: Automatically detects HTTP 429 status codes and honors `Retry-After` header directives before resuming execution.
- **Dual Format Output**: Emits human-readable reports in formatted ASCII tables or raw JSON objects for terminal piping.

---

## Installation & Setup

1. Verify Python 3.8+ is installed:
   ```bash
   python --version
   ```

2. Make the script executable (Unix/Linux/macOS):
   ```bash
   chmod +x scripts/mirha_client.py
   ```

---

## Command Usage Examples

### 1. Basic Local Test
By default, the script connects directly to the live production endpoint. To target your local environment:
```bash
python scripts/mirha_client.py --url "http://localhost:3000/api/v1/recommend" --postal "London" --skin "dry" --concern "dehydration"
```

### 2. Live API Testing
Using your live API key targeting the production gateway:
```bash
python scripts/mirha_client.py --api-key "YOUR_B2B_API_KEY" --postal "New York" --skin "sensitive"
```

### 3. Piping JSON directly to tools (e.g., `jq`)
```bash
python scripts/mirha_client.py --format json | jq '.diagnostics.waterHardnessPpm'
```

---

## CLI Flag Reference

| Flag | Default Value | Description |
|---|---|---|
| `--api-key` | `b2b_trial_key` | Authenticate with your trial or production API key. |
| `--url` | `https://www.mirhaandco.com/api/v1/recommend` | API gateway endpoint to query. |
| `--postal` | `London` | Postal code or city matrix. |
| `--skin` | `oily` | Target skin profile (`oily`, `dry`, `combination`, `sensitive`). |
| `--concern` | `acne` | Target skin issue (`acne`, `pigmentation`, `dullness`, `dehydration`). |
| `--format` | `text` | Display format (`text` reports or raw `json`). |
| `--timeout` | `15` | Request network timeout window in seconds. |
| `--retries` | `3` | Connection retry ceiling for flaky environments. |
