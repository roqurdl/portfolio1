# HERSE

Descrition
옷코디 + 라이브커머스 서비스

With Node.js, REST API, MongoDB, WebSocket, socketIO

shop
-Item
--list
--detail
--update
--delete
-user
--login
--
Live
-box==>should be seller
-chat==>should be user
==> WebSocket, socket.io

shop/user ==> customer
live/user ==> seller

shop/items ==> buy
live/items ==> broadcast room

Multer로 다수의 file을 다룰 시 모두 required 여야 오류 없음.

Product Edit의 previous image는 js작업을 하면서 추가할 것.

Live SocketIO 설계

adater => mongodb에 저장 ==> mongo adapter.
room들 중 public&private 분리, List를 Array로 만듦 => mixin을 활용해서 링크화.
