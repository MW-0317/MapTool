from PIL import Image
import os.path, os
import math

zoom_levels = 5
tile_size = 256

def get_closeset_power(base, num):
    cNum = 1
    diff = -1
    i = 1
    while diff < 0:
        cNum = base ** i
        diff = cNum - num
        i+=1
    return cNum

def main():
    im = Image.open("map.png")
    largest_s = im.size[0]
    if im.size[1] > im.size[0]:
        largest_s = im.size[1]
    closest = get_closeset_power(2, largest_s)
    zoom_amount = int(math.log(closest, 2)) - int(math.log(256, 2))
    back_im = Image.new('RGBA', (closest, closest), color = (0,0,0,0))
    back_im.paste(im, (closest//2 - im.size[0]//2, closest//2 - im.size[1]//2))
    
    for i in range(zoom_amount, -1, -1):
        z = zoom_amount - i
        # i+=1
        print(f"{i-1}: {i}\nzoom: {z}\nsize: {closest//(2**i)} x {closest//(2**i)}")
        new_im = back_im.resize((closest//(2**i), closest//(2**i)))
        for j in range(0, (closest//(2**i)), tile_size):
            # print(f"y: {j}")
            for k in range(0, (closest//(2**i)), tile_size):
                # print(f"x: {k}")
                temp_im = new_im.crop((k, j, k+tile_size, j+tile_size))
                # temp_im.show()
                dir = f"C:/Users/marki/Documents/Python Projects/MapTileCutter/mapimgs/{z}/{k//256}/"
                if os.path.isdir(dir):
                    temp_im.save(dir + f"{j//256}.png")
                else:
                    os.makedirs(dir)
                    temp_im.save(dir + f"{j//256}.png")

main()