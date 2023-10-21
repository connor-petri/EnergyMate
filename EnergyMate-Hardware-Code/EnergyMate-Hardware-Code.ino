#include <WiFi.h>
#include <HTTPClient.h>
#include <time.h>

const long  gmtOffset_sec = 3600;
const int   daylightOffset_sec = 3600;
const char* ntpServer = "pool.ntp.org";

const char *ssid = "inky";
const char *password = "summer0712";
const char *thingSpeakApiKey = "ZLGZCT9MRAVNRQ9K";
const char *thingSpeakUrl = "http://api.thingspeak.com/update";

void connectToWiFi() {
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void sendDataToThingSpeak(float data) {
  HTTPClient http;
configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  // Get current time
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("Failed to obtain time");
    return;
  }

  // Format the time as a string
  char formattedTime[20];
  strftime(formattedTime, sizeof(formattedTime), "%Y-%m-%dT%H:%M:%SZ", &timeinfo);

  // Build the update URL with data and time
  String url = String(thingSpeakUrl) + "?api_key=" + String(thingSpeakApiKey) + "&field1=" + String(data) + "&created_at=" + String(formattedTime);

  Serial.println(url);
  http.begin(url);

  int httpResponseCode = http.GET();

  if (httpResponseCode == 200) {
    Serial.println("Data sent to ThingSpeak successfully");
  } else {
    Serial.print("Error on ThingSpeak request. HTTP Response code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

void printLocalTime()
{
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("Failed to obtain time");
    return;
  }
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}
void setup() {
  Serial.begin(115200);
  connectToWiFi();
}

void loop() {
  // Read your sensor data
  float sensorData = 25.5; // Replace this with your actual sensor data
printLocalTime();
  // Send data to ThingSpeak
  sendDataToThingSpeak(sensorData);

  delay(15000); // Wait for 15 seconds before sending the next update (ThingSpeak allows updates every 15 seconds)
}

