# Usage

```shell
$ node index.js -p "alarm_(\d{8})_\d{6}\.mkv" -s /a/b/c -d /a/b/c
```

# Folder structure example

> Before run the script

    /
    └── a
        └── b
            └── c
                ├── alarm_20211127_132924.mkv
                ├── alarm_20211128_132924.mkv
                ├── alarm_20211129_132923.mkv
                └── alarm_20211129_132924.mkv

> After run the script

    /
    └── a
        └── b
            └── c
                └── 2021_11_27
                    └── alarm_20211127_132924.mkv
                └── 2021_11_28
                    └── alarm_20211128_132924.mkv
                └── 2021_11_29
                    ├── alarm_20211129_132923.mkv
                    └── alarm_20211129_132924.mkv
```
