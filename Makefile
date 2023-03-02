sftp_port := 65002
sftp_username := u238590099
sftp_ip := 185.212.70.176
all:	style

style:
	sass style.scss style.css

clean:
	rm style.css

publish:	style
	scp -P $(sftp_port) -C ./style.css $(sftp_username)@$(sftp_ip):public_html/staging/wp-content/themes/nmnm-storefront/
	scp -P $(sftp_port) -C ./functions.php $(sftp_username)@$(sftp_ip):public_html/staging/wp-content/themes/nmnm-storefront/
	scp -P $(sftp_port) -C -r ./assets $(sftp_username)@$(sftp_ip):public_html/staging/wp-content/themes/nmnm-storefront/