# Shopify Theme App Extension Integration Guide

This guide details how to bundle the **Mirha & Co. Skincare Intelligence Widget** into a Shopify Theme App Extension. This enables Shopify merchants to install the widget on their storefront code-free, using the native Shopify Theme Editor drag-and-drop customizer.

---

## 1. Directory Structure

In your Shopify CLI App project, create the following structure under the extensions folder:

```text
extensions/
└── mirha-widget-extension/
    ├── assets/
    ├── blocks/
    │   └── mirha_climate_widget.liquid
    └── shopify.extension.toml
```

---

## 2. Liquid Block Configuration

Create the file `extensions/mirha-widget-extension/blocks/mirha_climate_widget.liquid` and paste the code below. This defines the HTML container, dynamically grabs the customer's ZIP code (if logged in), and injects the widget script from the Mirha & Co. edge engine.

```liquid
{% schema %}
{
  "name": "Mirha Climate Widget",
  "target": "section",
  "templates": ["product", "index", "cart"],
  "settings": [
    {
      "type": "header",
      "content": "API Credentials"
    },
    {
      "type": "text",
      "id": "api_key",
      "label": "Mirha B2B API Key",
      "default": "b2b_trial_key",
      "info": "Obtain your API key from mirhaandco.com/b2b/dashboard"
    },
    {
      "type": "header",
      "content": "Default Skincare Context"
    },
    {
      "type": "select",
      "id": "skin_type",
      "label": "Default Skin Type",
      "options": [
        { "value": "oily", "label": "Oily" },
        { "value": "dry", "label": "Dry" },
        { "value": "combination", "label": "Combination" },
        { "value": "sensitive", "label": "Sensitive" }
      ],
      "default": "oily"
    },
    {
      "type": "select",
      "id": "main_concern",
      "label": "Default Skin Concern",
      "options": [
        { "value": "acne", "label": "Acne & Breakouts" },
        { "value": "pigmentation", "label": "Hyperpigmentation" },
        { "value": "dullness", "label": "Dullness" },
        { "value": "dehydration", "label": "Dehydration" }
      ],
      "default": "acne"
    },
    {
      "type": "header",
      "content": "Aesthetics & Styling"
    },
    {
      "type": "select",
      "id": "theme",
      "label": "Widget Theme Style",
      "options": [
        { "value": "light", "label": "Light" },
        { "value": "dark", "label": "Dark" }
      ],
      "default": "dark"
    },
    {
      "type": "color",
      "id": "accent_color",
      "label": "Accent Color",
      "default": "#fc2779"
    }
  ]
}
{% endschema %}

<!-- The container where the widget will mount dynamically -->
<div id="mirha-climate-widget" style="margin: 20px 0; width: 100%; display: flex; justify-content: center;"></div>

<script>
  (function() {
    var apiKey = '{{ block.settings.api_key }}';
    var skinType = '{{ block.settings.skin_type }}';
    var concern = '{{ block.settings.main_concern }}';
    var theme = '{{ block.settings.theme }}';
    var accent = '{{ block.settings.accent_color | replace: "#", "" }}';
    
    // Resolve dynamic zip from customer object if available on Shopify
    var zip = '';
    {% if customer and customer.default_address %}
      zip = '{{ customer.default_address.zip }}';
    {% endif %}
    
    // Load script dynamically pointing to Mirha B2B Widget API
    var script = document.createElement('script');
    var queryParams = [
      'apiKey=' + encodeURIComponent(apiKey),
      'skinType=' + encodeURIComponent(skinType),
      'mainConcern=' + encodeURIComponent(concern),
      'theme=' + encodeURIComponent(theme),
      'accentColor=' + encodeURIComponent(accent)
    ];
    if (zip) {
      queryParams.push('postalCode=' + encodeURIComponent(zip));
    }
    
    script.src = 'https://www.mirhaandco.com/api/v1/widget?' + queryParams.join('&');
    script.async = true;
    document.body.appendChild(script);
  })();
</script>
```

---

## 3. Dynamic Catalog Matching (For Merchants)

For advanced catalog matching (returning the merchant's exact Shopify product SKUs), they can pass their product catalog dynamically. Below is an example liquid script to map Shopify collections to our JSON catalog format inside the block script:

```liquid
<script>
  // Dynamically map merchant catalog from Shopify Liquid collections
  const shopifyCatalog = [
    {% for product in collections.all.products limit: 50 %}
      {
        id: "{{ product.variants.first.sku | default: product.id }}",
        name: "{{ product.title | escape }}",
        price: {{ product.price | money_without_currency | replace: ',', '' }},
        ingredients: [{% for tag in product.tags %}"{{ tag | escape }}"{% unless forloop.last %},{% endunless %}{% endfor %}]
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>
```

---

## 4. Merchant Dashboard Verification

Once the extension is deployed, the merchant:
1. Opens the **Shopify Theme Customizer**.
2. Clicks **Add Block** inside any product page template section.
3. Selects **Mirha Climate Widget**.
4. inputs their B2B API Key, customizes the accent color to match their brand palette, and saves.
