print("[")
for lat in range(-80, 90, 20):
	for long in range(-160, 180, 20):
		print("  [" + str(lat) + ", " + str(long) + "],")
print("]")