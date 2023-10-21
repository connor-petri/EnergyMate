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

const char *ssid = "inky";
const char *password = "summer0712";
const char *apiUrl = "http://137.184.231.21:5000/send_data";
int relayPin = 4;
int currentSensor = 6;

void connectToWiFi() {
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void sendDataToThingSpeak(int plugid, int wattage) {
  HTTPClient http;

  String url = String(apiUrl) + "?plugid=" + String(plugid) + "&wattage=" + String(wattage);

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

void setup() {
  Serial.begin(115200);
  Serial.println("EnergyMate Started");
  pinMode(relayPin, OUTPUT);
  pinMode(currentSensor, INPUT);
  digitalWrite(relayPin, 1);
  
  connectToWiFi();
}

void loop() {
  // int wattageVal = analogRead(currentSensor * 1.4);
  int wattageVal = random(50,60);

  sendDataToThingSpeak(1, wattageVal);
  delay(15000);  
}
