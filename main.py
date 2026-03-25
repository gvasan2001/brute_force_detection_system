import re
from datetime import datetime

def brute_force_detection(file_path, pattern):
    ip_attempts = {}
    log_pattern = re.compile(pattern)

    with open(file_path, 'r') as file:
        for line in file:
            match = log_pattern.search(line)
            if match:
                ip_address = match.group(1)

                # Convert timestamp (no year in logs → add dummy year)
                time_str = line[0:15]
                dt = datetime.strptime(time_str, "%b %d %H:%M:%S")
                dt = dt.replace(year=2026)

                if ip_address in ip_attempts:
                    ip_attempts[ip_address].append(dt)
                else:
                    ip_attempts[ip_address] = [dt]

    return ip_attempts


pattern = r'Failed password.*from (\d+\.\d+\.\d+\.\d+)'
ip_data = brute_force_detection('auth.log', pattern)

# Time window detection (60 seconds)
THRESHOLD = 5
WINDOW = 60  # seconds

for ip, times in ip_data.items():
    times.sort()

    for i in range(len(times)):
        count = 1
        for j in range(i + 1, len(times)):
            diff = (times[j] - times[i]).seconds

            if diff <= WINDOW:
                count += 1
            else:
                break

        if count > THRESHOLD:
            print(f"[ALERT] Brute-force detected | IP: {ip} | Attempts: {count} within {WINDOW} sec")
            break