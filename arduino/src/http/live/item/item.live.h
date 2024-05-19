#ifndef __ITEM_LIVE_H__
#define __ITEM_LIVE_H__

#include <ESP32HTTPClient.h>
#include <ArduinoJson.h>

void liveItem(uint8_t pin, const char* workerId, const char* workerId, const char* itemId, double temperature,double humidity,double lpg, bool save);

#endif