#include "wifi.h"

//Wifi credentials
const char* ssid = "sentinel101";
const char* password = "fsw27final";

//Setup wifi
void setupWifi(){
  //Connect to wifi
  WiFi.begin(ssid,password);

  //Wait for connection
  while (WiFi.status() != WL_CONNECTED)
  {
    //Wait 1 second
    delay(1000);
    Serial.println("*");
  }

  //Display IP address
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected to "+(WiFi.localIP()).toString());
  }
};