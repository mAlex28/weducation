import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobile/models/register_model.dart';
import 'package:mobile/pages/home.dart';
import 'package:mobile/services/api_services.dart';

import 'login.dart';

import 'package:flutter/material.dart';

import '../widget/base.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  var firstname = TextEditingController();
  var lastname = TextEditingController();
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
                          'First Name',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        KTextFiled(firstname, false),
                        const SizedBox(
                          height: 20,
                        ),
                        const Text(
                          'Last Name',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        KTextFiled(lastname, false),
                        const SizedBox(
                          height: 20,
                        ),
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
                        KTextFiled(pass, true),
                        const SizedBox(
                          height: 30,
                        ),
                        Visibility(
                          child: const Text("Email Already exsist!"),
                          visible: error,
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

                                RegisterRequest model = RegisterRequest(
                                  lastName: lastname.text.trim(),
                                  firstName: firstname.text.trim(),
                                  email: email.text.trim(),
                                  password: pass.text.trim(),
                                  imageUrl: '',
                                );

                                APIService.register(model).then((response) {
                                  setState(() {
                                    isLoading = false;
                                  });
                                  if (response.result != null) {
                                    Navigator.of(context)
                                        .push(MaterialPageRoute(builder: (_) {
                                      return const HomeScreen();
                                    }));
                                  } else {
                                    Fluttertoast.showToast(
                                        msg: 'Incomplete form',
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
                                    msg: 'Error signing up',
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
                                : const Text('Register'),
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
                                    return const LoginScreen();
                                  }));
                                },
                                child: const Text('Login'))),
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
