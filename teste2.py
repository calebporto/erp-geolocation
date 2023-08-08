from urllib.parse import quote_plus


a = 'https:/drive.google.com/drive/folders/0Byuw4Vz62NZLbWlZQkd1N2tNMGM?resourcekey=0-xdT2HOrHy8v-hzxgRcjCZA&usp=sharing'

parse = quote_plus(a)

print(parse)