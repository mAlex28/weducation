import 'dart:convert';

RegisterResponse registerResponse(String str) =>
    RegisterResponse.fromJson(json.decode(str));

class RegisterRequest {
  RegisterRequest({
    required this.imageUrl,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.password,
  });
  late final String imageUrl;
  late final String firstName;
  late final String lastName;
  late final String email;
  late final String password;

  RegisterRequest.fromJson(Map<String, dynamic> json) {
    imageUrl = json['imageUrl'];
    firstName = json['firstName'];
    lastName = json['lastName'];
    email = json['email'];
    password = json['password'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['imageUrl'] = imageUrl;
    _data['firstName'] = firstName;
    _data['lastName'] = lastName;
    _data['email'] = email;
    _data['password'] = password;
    return _data;
  }
}

class RegisterResponse {
  RegisterResponse({
    required this.result,
    required this.token,
  });
  late final Result? result;
  late final String token;

  RegisterResponse.fromJson(Map<String, dynamic> json) {
    result = json['result'] != null ? Result.fromJson(json['result']) : null;
    token = json['token'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['result'] = result!.toJson();
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
