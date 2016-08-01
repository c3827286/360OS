CFLAGS=-I../../include -I./
LDFLAGS=-L../../lib -lnorouter -lcrypto -lm -lnl cgicomm.o
CGILDFLAGS=$(LDFLAGS) -lcgi
dir=helloworld
target=helloworld.opk
NOSPACK=../../utility/mksquashfs

all: cgicomm.o hello app.cgi
	rm -f $(target)
	$(NOSPACK) $(dir) $(target)

hello: hello.c
	$(CC) -o ./hello ./hello.c $(LDFLAGS) $(CFLAGS) 
	cp -rf ./hello ./helloworld/bin/

app.cgi:  cgi.c
	$(CC) -o ./app.cgi cgi.c $(CGILDFLAGS) $(CFLAGS)
	cp -rf app.cgi ./helloworld/webs

cgicomm.o:
	$(CC) -c -o cgicomm.o cgicomm.c $(CFLAGS)
clean:
	rm -f *.o
	rm -f *.opk
	rm -f hello
	rm -f app.cgi


