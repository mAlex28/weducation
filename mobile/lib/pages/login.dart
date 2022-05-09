import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile/models/login_model.dart';
import 'package:mobile/pages/home.dart';
import 'package:mobile/pages/register.dart';
import 'package:mobile/services/api_services.dart';

import '/widget/base.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  var email = TextEditingController();
  var password = TextEditingController();

  bool error = false;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Center(
                    child: Container(
                      child: Image.asset('assets/Logo.png'),
                      width: MediaQuery.of(context).size.width / 2,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 10, right: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Email',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        KTextFiled(email, false),
                        const SizedBox(
                          height: 20,
                        ),
                        const Text(
                          'Password',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        KTextFiled(password, true),
                        Visibility(
                          child: const Text('Email or password wrong !'),
                          visible: error,
                        ),
                        const Center(
                          child: TextButton(
                              onPressed: null, child: Text('Forgot Password?')),
                        ),
                        SizedBox(
                          width: double.infinity,
                          height: 45,
                          child: ElevatedButton(
                            onPressed: () {
                              try {
                                setState(() {
                                  isLoading = true;
                                });
                                LoginRequest model = LoginRequest(
                                    email: email.text.trim(),
                                    password: password.text.trim());

                                APIService.login(model).then((response) {
                                  setState(() {
                                    isLoading = false;
                                  });
                                  if (response) {
                                    Navigator.of(context)
                                        .push(MaterialPageRoute(builder: (_) {
                                      return const HomeScreen();
                                    }));
                                  } else {
                                    Fluttertoast.showToast(
                                        msg: 'Invalid username / password',
                                        toastLength: Toast.LENGTH_SHORT,
                                        gravity: ToastGravity.BOTTOM,
                                        timeInSecForIosWeb: 1,
                                        backgroundColor: Colors.grey,
                                        textColor: Colors.white,
                                        fontSize: 14.0);
                                  }
                                });
                              } catch (e) {
                                Fluttertoast.showToast(
                                    msg: 'Error signing in',
                                    toastLength: Toast.LENGTH_SHORT,
                                    gravity: ToastGravity.BOTTOM,
                                    timeInSecForIosWeb: 1,
                                    backgroundColor: Colors.grey,
                                    textColor: Colors.white,
                                    fontSize: 14.0);
                              }
                            },
                            child: isLoading
                                ? const CircularProgressIndicator()
                                : const Text('Login'),
                          ),
                        ),
                        const SizedBox(height: 10),
                        SizedBox(
                            width: double.infinity,
                            height: 45,
                            child: OutlinedButton(
                                onPressed: () {
                                  Navigator.of(context)
                                      .push(MaterialPageRoute(builder: (_) {
                                    return const RegisterScreen();
                                  }));
                                },
                                child: const Text('Register'))),
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
