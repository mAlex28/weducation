import 'package:post_ui/pages/home.dart';

import 'login.dart';
import '/style/textstyle.dart';
import 'package:flutter/material.dart';
import 'package:iconly/iconly.dart';

import '../widget/ProfileCard.dart';
import '../widget/ProfileIconcard.dart';
import '../widget/bottemnavbar.dart';

var isLoading = false;

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(
                  width: double.infinity,
                ),
                const CircleAvatar(
                  maxRadius: 50,
                  backgroundColor: Colors.black,
                ),
                Text('username', style: KH1),
                Text(
                  'user@admin.com',
                  style: KP2,
                ),
                const SizedBox(
                  height: 5,
                ),
                const SizedBox(
                  height: 10,
                ),
                Wrap(
                  children: [
                    ProfileIconcard(
                        title: "favorite",
                        icon: IconlyLight.heart,
                        press: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => HomeScreen(),
                            ),
                          );
                        }),
                    const SizedBox(
                      height: 15,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        IconButton(
                            onPressed: () {
                              Navigator.of(context)
                                  .push(MaterialPageRoute(builder: (_) {
                                return const HomeScreen();
                              }));
                            },
                            icon: const Icon(
                              IconlyLight.logout,
                              color: Colors.black,
                            )),
                        TextButton(
                            onPressed: () {},
                            child: const Text(
                              "LOGOUT",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.w700),
                            )),
                      ],
                    )
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: bottombar(context),
    );
  }
}
