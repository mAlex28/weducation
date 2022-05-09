import 'package:flutter/material.dart';

import '../style/colors.dart';

class KTextFiled extends StatelessWidget {
  final controller;
  final bool st;
  const KTextFiled(this.controller, this.st, {Key? key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 50,
      child: TextField(
        obscureText: st,
        controller: controller,
        autocorrect: true,
        decoration: InputDecoration(
          hintStyle: TextStyle(color: Colors.grey),
          filled: true,
          fillColor: Colors.white70,
          enabledBorder: const OutlineInputBorder(
            borderRadius: BorderRadius.all(Radius.circular(12.0)),
            borderSide: BorderSide(color: Colors.grey, width: 1),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.all(Radius.circular(10.0)),
            borderSide: BorderSide(color: Kmaincolor500),
          ),
        ),
      ),
    );
  }
}
