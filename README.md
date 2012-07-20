
# Pode

Asynchronous processing, with the ability to set triggers for actions: on _date_ do _some_action_.

Example communication from the client:

	on 2012-07-20T10:09:29+02:00
	do some_action
	{"these are optional":"json encoded parameters"}
	

The server will then respond with `done` or `error` and close the connection.


### Example clients

* PHP


## Install


    git clone git://github.com/Znarkus/pode.git
    cd pode

Create a directory `action/` and copy the example action from `example/` and rename it to `example.js`.

    node .

Open another terminal.

    php -f example/client.php


## License (MIT)

Copyright (C) 2012 Snowfire AB, Markus Hedlund <markus@snowfireit.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.