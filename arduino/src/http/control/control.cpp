#include "control.h"

void controlItem(uint8_t pin, const char* workerId, const char* workerId, const char* itemId) {
    //Initialising variables
    HTTPClient http;
    StaticJsonDocument<200> doc;
    
    //Setting body for request
    doc["worker_id"] = workerId;
    doc["worker_id"] = workerId;
    doc["item_id"] = itemId;

    String json;
    serializeJson(doc, json);

    //Sending request
    http.begin("http://192.168.43.70:8000/arduino/read");
    http.addHeader("Content-Type", "application/json");
    http.addHeader("pass", "sentinel11");
    http.POST(json);

    //Reading response
    String payload = http.getString();
    
    //Parsing response
    deserializeJson(doc, payload);

    //Setting pin to output
    bool status = doc["status"];
    digitalWrite(pin, status);
}