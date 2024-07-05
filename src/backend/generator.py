import qrcode

features=qrcode.QRCode(version=1,box_size=40,border=3)
features.add_data('https://www.leetcode.com')
features.make(fit=True)
gen_img=features.make_image(fill_color="red",back_color="white")
gen_img.save('image1.png')
print("Image is saved")