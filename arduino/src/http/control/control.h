#ifndef __CONTROL_H__
#define __CONTROL_H__

#include <ESP32HTTPClient.h>
#include <ArduinoJson.h>

void controlItem(uint8_t pin, const char* workerId, const char* workerId, const char* itemId);

#endif