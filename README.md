# HERSE

Descrition
옷코디 + 라이브커머스 서비스

With Node.js, REST API, MongoDB, socketIO

shop
Item
list
detail
update
delete
user
login
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

liveController, server => backend (node.js)
liveApp => frontend
form action 을 통해 url을 구성하여 create room에서 room detail로 가는 것으로 한번 ㄱ
영상은 host만 가능하게 채팅은 모두가 가능 WebRTC사용 +Data Channel(채팅기능)
mongo adapter 분석필요.// => 불가능한 것으로 판별.
동영상을 올리는 방식으로 Live를 대신하는 것으로.

WebRTC의 Data Channel의 기능을 통해서 채팅상담 기능을 추가할 것.

user CURD Basic
Login=> use session
node Streaming 적용
