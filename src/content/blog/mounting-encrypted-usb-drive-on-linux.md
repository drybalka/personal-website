---
title: Mounting encrypted USB drive on Linux
date: 2021-08-09
---

Every once in a while I need to mount an encrypted USB flash-drive to my laptop running Linux.
The problem is that happens so rarely that I struggle to remember the correct sequence of commands, while setting up automounting seems unnecessary to me.
Well, this short blog post is meant to address exactly that.

1. Insert USB-drive and list all connected disks: `sudo fdisk -l`.
   Note the device path of the flash-drive, typically `/dev/sda1`.
2. Next run something like `sudo cryptsetup open --type=bitlk /dev/sda1 usb` to decrypt the drive.
   Here the device "type" is Bitlocker, but cryptsetup supports also LUKS and other types.
   The last argument "usb" is the name I typically choose for unencrypted mappings.
   Skip this step if the drive has no encryption.
3. Now mount the device with `sudo mount /dev/mapper/usb /mnt/usb`.
   Here the mapper is created by cryptsetup in the previous step (use the /dev path for unencrypted drives).
4. This is it, you may use the drive as any other filesystem on your laptop.
5. After finishing, unmount first with `sudo umount /mnt/usb`, then close with `sudo cryptsetup close usb`.

All in all, pretty simple.
