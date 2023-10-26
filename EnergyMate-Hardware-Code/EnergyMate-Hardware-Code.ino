/*
 * EnergyMate-Hardware-Code
 * https://github.com/connor-petri/EnergyMate/tree/main/EnergyMate-Hardware-Code
 *
 * Copyright (c) 2023 Inky Ganbold
 * Released under the MIT License
 * https://opensource.org/licenses/MIT
 *
 * Date: October 21, 2023
 */
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>  // Include the ArduinoJson library

const char *ssid = "inky";
const char *password = "summer0712";
const char *API_KEY = "F68SA3LCFQGUNYD7";
const char *apiUrl = "https://api.thingspeak.com/update";
int relayPin = 4;
int currentSensor = 6;

int field3 = 0;
const float electricityRate = 0.20;  // Replace with your actual electricity rate in $/kWh
float totalCost = 0.0;

unsigned long myTime;


void connectToWiFi() {
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}


void calculateCost(int relayState, int powerConsumption, int timeInHours) {
  // If relay is ON, calculate energy consumption and cost
  if (relayState == HIGH) {
    float energyConsumption = (powerConsumption * timeInHours) / 1000.0;  // Energy in kWh
    float cost = energyConsumption * electricityRate;

    Serial.print("Energy Consumption: ");
    Serial.print(energyConsumption);
    Serial.print(" kWh, Cost: $");
    Serial.println(cost);

   totalCost += cost;
  } else {
    Serial.println("Relay is OFF. No energy consumption.");
  }
  
}

void sendDataToThingSpeak(int wattage, int deviceid, int state, double money) {
  HTTPClient http;

  String url = String(apiUrl) + "?api_key=" + String(API_KEY) + "&field1=" + String(wattage) + "&field2=" + String(deviceid) + "&field3=" + String(state) + "&field4=" + String(money);
  digitalWrite(relayPin, state);
  Serial.println(url);
  http.begin(url);

  int httpResponseCode = http.GET();

  if (httpResponseCode == 200) {
    Serial.println("Data sent to Server successfully");
  } else {
    Serial.print("Error on request. HTTP Response code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

void controlRelay(int relayState) {
  digitalWrite(relayPin, relayState);
  Serial.print("Relay State: ");
  Serial.println(relayState == HIGH ? "ON" : "OFF");
  delay(200);
}
void setup() {
  Serial.begin(115200);
  Serial.println("EnergyMate Started");
  pinMode(relayPin, OUTPUT);
  pinMode(currentSensor, INPUT);
  digitalWrite(relayPin, 1);

  connectToWiFi();
}

void loop() {
  int wattageVal = analogRead(currentSensor * 1.4);
  myTime = millis();
  float sumcost = myTime/3600;
  calculateCost(HIGH, 50, sumcost);
  

  sendDataToThingSpeak(wattageVal, 1, 1, sumcost/100);

  delay(15000);
}
