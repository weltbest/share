function getAddress(field) {
    var id = getQueryParameter.call({ url: field.url, key: "id" });
    var starttime = getQueryParameter.call({ url: field.url, key: "starttime" });
    var endtime = getQueryParameter.call({ url: field.url, key: "endtime" });
  
    var cache = getCache.call(id);

    if (cache != null && !starttime) {
       //return JSON.stringify({ url: cache });
    }

    var user = '16725715925';
    var ptoken = 'waKmBHhZAdKcejcq1JPAuA==';
    var pserialnumber = 'a3966bd92e6664b1';
    var cid = '30';
    var timestamp = Math.round(new Date().getTime() / 1000);

    var nonce = Math.floor(Math.random() * (9999999999 - 3000000000 + 1) + 3000000000);

    var str = 'sumasalt-app-portalpVW4U*FlS' + timestamp + nonce + user;
    var hmac = sha1.call(str).toString().substr(0, 10);

    var header = { 'Content-Type': 'application/x-www-form-urlencoded' }
    var body = 'ptype=1&plocation=001&puser=' + user + '&ptoken=' + ptoken + '&pversion=030107&pserverAddress=portal.gcable.cn&pserialNumber=' + pserialnumber + '&pkv=1&ptn=Y29tLnN1bWF2aXNpb24uc2FucGluZy5ndWRvdQ&DRMtoken=&epgID=&authType=0&secondAuthid=&t=' + ptoken + '&pid=&cid=' + cid + '&u=' + user + '&p=1&l=001&d=' + pserialnumber + '&n=' + id + '&v=2&ot=0&pappName=GoodTV&hmac=' + hmac + '&timestamp=' + timestamp + '&nonce=' + nonce;

    if (starttime != null && endtime != null) {
        // body = body + "&starttime=" + starttime + "&endtime=" + endtime + "&/PLTV/hls.smil.m3u8";
    }

    var object = { url: 'http://portal.gcable.cn:8080/PortalServer-App/new/aaa_aut_aut002', header: JSON.stringify(header), body: body };
    var res = post.call(object);

    var json = JSON.parse(res);
    if (json.status == "0") {
        var result = json.data.authResult;
        var token = "?t=" + getQueryParameter.call({ url: result, key: "t" }) + "&u=" + getQueryParameter.call({ url: result, key: "u" }) + "&p=" + getQueryParameter.call({ url: result, key: "p" }) + "&pid=&cid=" + getQueryParameter.call({ url: result, key: "cid" }) + "&d=" + getQueryParameter.call({ url: result, key: "d" }) + "&sid=" + getQueryParameter.call({ url: result, key: "sid" }) + "&r=" + getQueryParameter.call({ url: result, key: "r" }) + "&e=" + getQueryParameter.call({ url: result, key: "e" }) + "&nc=" + getQueryParameter.call({ url: result, key: "nc" }) + "&a=" + getQueryParameter.call({ url: result, key: "a" }) + "&v=" + getQueryParameter.call({ url: result, key: "v" });

        var playurl = "http://gslb.gcable.cn:8070/live/" + id + ".m3u8" + token;

        if (starttime && endtime) {
            playurl = "http://gslb.gcable.cn:8070/live/" + id + ".m3u8" + token + "&starttime=" + starttime + "&endtime=" + endtime;
        }

        var field = { name: id, value: playurl, expire: "3600" }
        setCache.call(field);
        return JSON.stringify({ url: playurl, cache: field });
    } else {
        return res;
    }
}

