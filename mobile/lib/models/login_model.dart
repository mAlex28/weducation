import 'dart:convert';

LoginResponse loginRepsonse(String str) =>
    LoginResponse.fromJson(json.decode(str));

class LoginRequest {
  LoginRequest({
    required this.email,
    required this.password,
  });
  late final String email;
  late final String password;

  LoginRequest.fromJson(Map<String, dynamic> json) {
    email = json['email'];
    password = json['password'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['email'] = email;
    _data['password'] = password;
    return _data;
  }
}

class LoginResponse {
  LoginResponse({
    required this.result,
    required this.token,
  });
  late final Result result;
  late final String token;

  LoginResponse.fromJson(Map<String, dynamic> json) {
    result = Result.fromJson(json['result']);
    token = json['token'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['result'] = result.toJson();
    _data['token'] = token;
    return _data;
  }
}

class Result {
  Result({
    required this.id,
    required this.imageUrl,
    required this.name,
    required this.email,
    required this.password,
    required this.createdAt,
    required this.updatedAt,
    required this.V,
  });
  late final String id;
  late final String imageUrl;
  late final String name;
  late final String email;
  late final String password;
  late final String createdAt;
  late final String updatedAt;
  late final int V;

  Result.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    imageUrl = json['imageUrl'];
    name = json['name'];
    email = json['email'];
    password = json['password'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    V = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['_id'] = id;
    _data['imageUrl'] = imageUrl;
    _data['name'] = name;
    _data['email'] = email;
    _data['password'] = password;
    _data['createdAt'] = createdAt;
    _data['updatedAt'] = updatedAt;
    _data['__v'] = V;
    return _data;
  }
}
