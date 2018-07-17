import sys
from datetime import datetime
from time import sleep
from Adafruit_Thermal import *

padding = int(sys.argv[1])
linebreaks = int(sys.argv[2])

printer = Adafruit_Thermal("COM4", 9600, timeout=5)
printer.begin()
printer.wake()

printer.inverseOn()
printer.println(datetime.now().strftime('%d-%m-%Y %H:%M:%S'))
printer.inverseOff()

for i in range (3, sys.argv.__len__()):
    if i == 3 or i == 6 or i == 9 or i == 12 or i == 15 or i == 18 or i == 21 or i == 24 or i == 27 or i == 30 or i == 33 or i == 36 or i == 39 or i == 42:
        printer.justify(sys.argv[i])

    if i == 4 or i == 7 or i == 10 or i == 13 or i == 16 or i == 19 or i == 22 or i == 25 or i == 28 or i == 31 or i == 34 or i == 37 or i == 40 or i == 43:
        printer.setSize(sys.argv[i])
        
    if i == 5 or i == 8 or i == 11 or i == 14 or i == 17 or i == 20 or i == 23 or i == 26 or i == 29 or i == 32 or i == 35 or i == 38 or i == 41 or i == 44:
        printer.println(sys.argv[i])

    printer.feed(linebreaks)

printer.feed(padding)
printer.feed(2)
