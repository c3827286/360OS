CFLAGS=-I../../include -I./
LDFLAGS=-L../../lib -lnorouter -lcrypto -lm -lnl
dir=webauth
target=webauth_app.opk
NOSPACK=../../utility/mksquashfs

all: md5.o app.cgi webauth_app
	rm -f $(target)
	$(NOSPACK) $(dir) $(target)

app.cgi: webauth_cgi.c
	$(CC) -o app.cgi webauth_cgi.c $(CFLAGS) $(LDFLAGS) ../../lib/cgi.so
	cp -rf ./app.cgi ./webauth/webs
	
webauth_app: webauth_app.c
	$(CC) -o webauth_app webauth_app.c $(CFLAGS) $(LDFLAGS) md5.o
	cp -rf ./webauth_app ./webauth/bin/

md5.o:
	$(CC) -c -o md5.o md5.c

clean:
	rm -f *.o
	rm -f *.opk
	rm -f app.cgi
	rm -f webauth_app
	rm -f ./webauth/webs/app.cgi
	rm -f ./webauth/bin/webauth_app


