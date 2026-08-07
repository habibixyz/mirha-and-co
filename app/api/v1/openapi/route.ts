import { NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=3600",
};

export async function GET() {
  const spec = {
    openapi: "3.0.3",
    info: {
      title: "Mirha & Co. B2B Climate Skincare API",
      description:
        "Climate-aware skincare recommendation engine for B2B partners. Returns personalised product routines based on real-time water hardness, temperature, humidity, and skin profile data.",
      version: "1.0.0",
      contact: {
        name: "Mirha & Co. B2B Support",
        url: "https://www.mirhaandco.com/b2b",
        email: "b2b@mirhaandco.com",
      },
    },
    servers: [
      {
        url: "https://www.mirhaandco.com",
        description: "Production (Global Edge)",
      },
    ],
    paths: {
      "/api/v1/health": {
        get: {
          operationId: "getHealth",
          summary: "API Health Check",
          description:
            "Returns the current API and database connectivity status. Used by partner uptime monitors.",
          tags: ["System"],
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "ok" },
                      service: { type: "string", example: "mirha-b2b-api" },
                      timestamp: { type: "string", format: "date-time" },
                      checks: {
                        type: "object",
                        properties: {
                          database: { type: "string", example: "connected" },
                          dbLatencyMs: { type: "number", example: 4 },
                        },
                      },
                    },
                  },
                },
              },
            },
            "503": {
              description: "Service degraded (database unreachable)",
            },
          },
        },
      },
      "/api/v1/recommend": {
        options: {
          operationId: "recommendCors",
          summary: "CORS Preflight",
          tags: ["Recommendations"],
          responses: {
            "204": { description: "No Content — CORS preflight approved" },
          },
        },
        post: {
          operationId: "postRecommend",
          summary: "Get Skincare Recommendation",
          description:
            "Core recommendation endpoint. Resolves real-time climate data for the given location and returns a personalised skincare routine based on skin profile.",
          tags: ["Recommendations"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["apiKey", "skinType"],
                  properties: {
                    apiKey: {
                      type: "string",
                      description: 'Your B2B API key. Use "b2b_trial_key" for testing.',
                      example: "b2b_trial_key",
                    },
                    skinType: {
                      type: "string",
                      enum: ["oily", "dry", "combination", "sensitive"],
                      example: "oily",
                    },
                    mainConcern: {
                      type: "string",
                      enum: ["acne", "pigmentation", "dullness", "dehydration"],
                      description: "Required unless skinType is 'sensitive'.",
                      example: "acne",
                    },
                    budget: {
                      type: "string",
                      enum: ["under_1000", "mid_tier", "luxury"],
                      default: "under_1000",
                    },
                    experience: {
                      type: "string",
                      enum: ["beginner", "intermediate", "advanced"],
                      default: "beginner",
                    },
                    city: { type: "string", example: "Mumbai" },
                    country: { type: "string", example: "IN" },
                    postalCode: { type: "string", example: "400001" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Recommendation generated successfully",
              headers: {
                "X-RateLimit-Limit": {
                  description: "Burst request limit per minute",
                  schema: { type: "integer" },
                },
                "X-RateLimit-Remaining": {
                  description: "Remaining burst requests in current window",
                  schema: { type: "integer" },
                },
                "X-Quota-Limit": {
                  description: "Monthly quota cap",
                  schema: { type: "integer" },
                },
                "X-Quota-Remaining": {
                  description: "Remaining monthly API calls",
                  schema: { type: "integer" },
                },
                "X-Quota-Reset": {
                  description: "ISO timestamp when monthly quota resets",
                  schema: { type: "string", format: "date-time" },
                },
              },
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      diagnostics: {
                        type: "object",
                        properties: {
                          location: { type: "string", example: "Mumbai, IN" },
                          resolvedVia: { type: "string", enum: ["live", "fallback"] },
                          waterHardnessPpm: { type: "number", example: 180 },
                          waterHardnessCategory: { type: "string", example: "Hard" },
                          temperatureC: { type: "number", example: 29 },
                          humidityPercent: { type: "number", example: 75 },
                          dewpointC: { type: "number", example: 24 },
                          environmentalStress: {
                            type: "object",
                            properties: {
                              tewlRiskLevel: { type: "string" },
                              mineralScumRiskLevel: { type: "string" },
                            },
                          },
                        },
                      },
                      quota: {
                        type: "object",
                        properties: {
                          remaining: { type: "integer" },
                          monthlyQuota: { type: "integer" },
                          quotaResetAt: { type: "string", format: "date-time" },
                        },
                      },
                      recommendation: {
                        type: "object",
                        description: "Full skincare routine with product recommendations per category.",
                      },
                      educationalGuides: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            title: { type: "string" },
                            excerpt: { type: "string" },
                            url: { type: "string" },
                            readTime: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Validation error — invalid skinType or mainConcern",
            },
            "401": {
              description: "Missing or invalid API key",
            },
            "403": {
              description: "Origin not whitelisted for this API key",
            },
            "429": {
              description: "Rate limit or monthly quota exceeded",
            },
            "500": {
              description: "Internal server error",
            },
          },
          security: [{ apiKey: [] }],
        },
      },
      "/api/v1/widget": {
        get: {
          operationId: "getWidget",
          summary: "Embeddable Climate Widget Script",
          description:
            "Returns an embeddable JavaScript snippet that renders a hard-water & climate diagnostic widget. Drop a `<div id='mirha-climate-widget'>` on your page and load this script.",
          tags: ["Widget"],
          parameters: [
            {
              name: "apiKey",
              in: "query",
              required: true,
              schema: { type: "string" },
              example: "b2b_trial_key",
            },
            {
              name: "skinType",
              in: "query",
              schema: { type: "string", enum: ["oily", "dry", "combination", "sensitive"] },
              example: "oily",
            },
            {
              name: "mainConcern",
              in: "query",
              schema: { type: "string", enum: ["acne", "pigmentation", "dullness", "dehydration"] },
              example: "acne",
            },
            {
              name: "postalCode",
              in: "query",
              schema: { type: "string" },
              example: "400001",
            },
            {
              name: "theme",
              in: "query",
              schema: { type: "string", enum: ["dark", "light"], default: "dark" },
              description: "Widget colour theme. Defaults to dark.",
            },
            {
              name: "accentColor",
              in: "query",
              schema: { type: "string" },
              description: "Hex accent colour without #, e.g. fc2779. Defaults to brand pink.",
              example: "fc2779",
            },
          ],
          responses: {
            "200": {
              description: "JavaScript widget snippet",
              content: { "application/javascript": { schema: { type: "string" } } },
            },
            "401": { description: "Missing or invalid API key" },
            "429": { description: "Rate limit exceeded" },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          in: "body",
          name: "apiKey",
          description: 'Pass your B2B API key in the JSON request body as "apiKey".',
        },
      },
    },
    tags: [
      { name: "System", description: "Health and status endpoints" },
      { name: "Recommendations", description: "Core skincare recommendation engine" },
      { name: "Widget", description: "Embeddable partner widget" },
    ],
  };

  return NextResponse.json(spec, { headers: CORS_HEADERS });
}
