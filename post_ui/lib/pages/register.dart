// import 'package:camping/screen/home.dart';
import 'login.dart';

import 'package:flutter/material.dart';

import '../widget/base.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  var name = TextEditingController();
  var email = TextEditingController();
  var pass = TextEditingController();

  bool isLoading = false;
  bool error = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Center(
                    child: Container(
                      child: Image.asset('assets/Logo.png'),
                      width: MediaQuery.of(context).size.width / 2,
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Padding(
                    padding: EdgeInsets.only(left: 10, right: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Name',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(
                          height: 10,
                        ),
                        KTextFiled(name, false),
                        SizedBox(
                          height: 20,
                        ),
                        Text(
                          'Email',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(
                          height: 10,
                        ),
                        KTextFiled(email, false),
                        SizedBox(
                          height: 20,
                        ),
                        Text(
                          'Password',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(
                          height: 10,
                        ),
                        KTextFiled(pass, true),
                        SizedBox(
                          height: 30,
                        ),
                        Visibility(
                          child: Text("Email Already exsist!"),
                          visible: error,
                        ),
                        SizedBox(
                          width: double.infinity,
                          height: 45,
                          child: ElevatedButton(
                            onPressed: () {},
                            child: isLoading
                                ? CircularProgressIndicator()
                                : Text('Register'),
                          ),
                        ),
                        SizedBox(height: 10),
                        SizedBox(
                            width: double.infinity,
                            height: 45,
                            child: OutlinedButton(
                                onPressed: () {
                                  Navigator.of(context)
                                      .push(MaterialPageRoute(builder: (_) {
                                    return LoginScreen();
                                  }));
                                },
                                child: Text('Login'))),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
