import '/style/colors.dart';
import 'package:flutter/material.dart';

class ProfileIconcard extends StatefulWidget {
  final GestureTapCallback press;
  final String title;
  final IconData icon;
  ProfileIconcard({
    required this.title,
    required this.icon,
    required this.press,
  });

  @override
  _ProfileIconcardState createState() => _ProfileIconcardState();
}

class _ProfileIconcardState extends State<ProfileIconcard> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 15),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8.0),
          color: Kgray100,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              spreadRadius: 1,
              blurRadius: 2,
              offset: Offset(0, 2), // changes position of shadow
            ),
          ],
        ),
        child: ListTile(
          leading: Icon(
            widget.icon,
            color: Colors.black,
          ),
          title: Text(
            widget.title,
            style: const TextStyle(
              fontFamily: 'Quicksand',
              fontSize: 16,
              fontStyle: FontStyle.normal,
              fontWeight: FontWeight.w500,
              color: Color(0xff363853),
            ),
          ),
          trailing: const Icon(
            Icons.arrow_forward_ios,
            size: 15,
            color: Color(0xff363853),
          ),
          onTap: widget.press,
        ),
      ),
    );
  }
}
