import '/style/colors.dart';
import 'package:flutter/material.dart';

class ProfileCard extends StatefulWidget {
  final GestureTapCallback press;
  final String title;
  const ProfileCard({required this.title, required this.press});

  @override
  _ProfileCardState createState() => _ProfileCardState();
}

class _ProfileCardState extends State<ProfileCard> {
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
          trailing: Icon(
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
