import 'package:flutter/material.dart';
import 'package:iconly/iconly.dart';
import 'package:post_ui/pages/home.dart';
import 'package:post_ui/pages/profile.dart';
import '/style/colors.dart';

int _selectedIndex = 0;

Widget bottombar(context) {
  return BottomNavigationBar(
    type: BottomNavigationBarType.fixed,
    fixedColor: Kmaincolor500,
    currentIndex: _selectedIndex,
    onTap: (int index) {
      _selectedIndex = index;
      if (index == 0) {
        Navigator.of(context).push(MaterialPageRoute(builder: (_) {
          return HomeScreen();
        }));
      } else if (index == 1) {
        Navigator.of(context).push(MaterialPageRoute(builder: (_) {
          return ProfilePage();
        }));
      }
    },
    items: const [
      BottomNavigationBarItem(
        icon: Icon(
          IconlyLight.home,
        ),
        activeIcon: Icon(IconlyBold.home),
        label: 'Home',
        backgroundColor: Colors.black,
      ),
      BottomNavigationBarItem(
        icon: Icon(IconlyLight.profile),
        activeIcon: Icon(IconlyBold.profile),
        label: 'Profile',
        backgroundColor: Colors.black,
      ),
    ],
  );
}
