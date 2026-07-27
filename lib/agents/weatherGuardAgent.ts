import { resolveLocationDataLive } from "../geocoding";

export interface WeatherGuardTrigger {
  city: string;
  temperatureC: number;
  humidityPercent: number;
  ppm: number;
  triggerType: "COLD_FREEZE" | "DESERT_DRY" | "MONSOON_HUMID" | "HARD_WATER_ALERT" | "OPTIMAL";
  alertHeadline: string;
  actionRequired: string;
  recommendedActiveOverride: string;
}

export async function runWeatherGuardAgent(city: string): Promise<WeatherGuardTrigger> {
  const climate = await resolveLocationDataLive({ city });

  const temp = climate.temp ?? 20;
  const humidity = climate.humidity ?? 50;
  const ppm = climate.ppm ?? 120;

  if (temp <= 5) {
    return {
      city: climate.city,
      temperatureC: temp,
      humidityPercent: humidity,
      ppm,
      triggerType: "COLD_FREEZE",
      alertHeadline: `⚠️ Freezing Weather Warning in ${climate.city} (${temp}°C)`,
      actionRequired: "Cold sub-zero temperatures strip skin lipids rapidly. Heavy barrier occlusives required immediately.",
      recommendedActiveOverride: "Switch PM cream to Ceramide NP + Shea Butter Lipid Balm. Pause strong AHA exfoliation.",
    };
  }

  if (humidity <= 35) {
    return {
      city: climate.city,
      temperatureC: temp,
      humidityPercent: humidity,
      ppm,
      triggerType: "DESERT_DRY",
      alertHeadline: `🌵 Low Air Moisture Alert in ${climate.city} (${humidity}% Relative Humidity)`,
      actionRequired: "Extreme trans-epidermal water loss (TEWL) risk detected.",
      recommendedActiveOverride: "Apply Squalane Oil seal over Hyaluronic Acid on damp skin within 60 seconds of washing.",
    };
  }

  if (ppm >= 200) {
    return {
      city: climate.city,
      temperatureC: temp,
      humidityPercent: humidity,
      ppm,
      triggerType: "HARD_WATER_ALERT",
      alertHeadline: `🚰 Very Hard Water Scum Alert in ${climate.city} (${ppm} PPM)`,
      actionRequired: "Heavy calcium deposit risk causing clogged pores and cleansing residue.",
      recommendedActiveOverride: "Use EDTA micellar rinse before foaming cleanser. Avoid pure soap bar cleansers.",
    };
  }

  return {
    city: climate.city,
    temperatureC: temp,
    humidityPercent: humidity,
    ppm,
    triggerType: "OPTIMAL",
    alertHeadline: `✨ Climate Conditions Stable in ${climate.city}`,
    actionRequired: "Environmental barrier stress is currently low.",
    recommendedActiveOverride: "Maintain baseline AM/PM routine as scheduled.",
  };
}
