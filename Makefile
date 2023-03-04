sftp_port := 65002
sftp_username := u238590099
sftp_ip := 185.212.70.176
all:	style

style:
	sass style.scss style.css

clean:
	rm style.css

publish:	style
	rsync -aPe "ssh -p $(sftp_port)" ./ $(sftp_username)@$(sftp_ip):public_html/staging/wp-content/themes/nmnm-storefront/ \
		--exclude style.scss --exclude style.css.map --exclude .git \
		--exclude .gitignore --exclude Makefile --exclude assets/**/*.ttf \
		--exclude assets/**/*.otf