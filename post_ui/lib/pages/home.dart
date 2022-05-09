import 'package:post_ui/widget/base.dart';
import 'package:post_ui/widget/bottemnavbar.dart';

import '/style/colors.dart';
import '/style/textstyle.dart';

import 'package:flutter/material.dart';
import 'package:iconly/iconly.dart';
import 'package:cached_network_image/cached_network_image.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  var searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                SizedBox(
                  child: TextField(
                    autocorrect: true,
                    decoration: InputDecoration(
                      hintText: 'Serach using name or tags',
                      hintStyle:
                          TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
                      filled: true,
                      fillColor: Color.fromARGB(179, 68, 68, 68),
                    ),
                  ),
                  width: MediaQuery.of(context).size.width - 60,
                ),
                SizedBox(
                  width: 5,
                ),
                Icon(
                  IconlyLight.search,
                  size: 30,
                ),
              ],
            ),
          ),
        ),
        body: SafeArea(
          child: SingleChildScrollView(
            child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(0.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          // Row(
                          //   children: [
                          //     CircleAvatar(
                          //       backgroundImage:
                          //           AssetImage('assets/images/profile.png'),
                          //       backgroundColor: Kmaincolor500,
                          //       maxRadius: 30,
                          //     ),
                          //     const SizedBox(
                          //       width: 10,
                          //     ),
                          //     Column(
                          //       crossAxisAlignment: CrossAxisAlignment.start,
                          //       children: [
                          //         Text(
                          //           'Welcome',
                          //           style: KH3,
                          //         ),
                          //         Text(
                          //           "User Name",
                          //           style: KH3,
                          //         ),
                          //       ],
                          //     ),
                          //   ],
                          // ),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Column(
                      children: [
                        // Row(
                        //   children: [
                        //     SizedBox(
                        //       child: TextField(
                        //         autocorrect: true,
                        //         decoration: InputDecoration(
                        //           hintText: 'Serach using name or tags',
                        //           hintStyle: TextStyle(
                        //               color: Color.fromARGB(255, 255, 255, 255)),
                        //           filled: true,
                        //           fillColor: Color.fromARGB(179, 68, 68, 68),
                        //         ),
                        //       ),
                        //       width: MediaQuery.of(context).size.width - 100,
                        //     ),
                        //     SizedBox(
                        //       width: 5,
                        //     ),
                        //     ElevatedButton.icon(
                        //       onPressed: () {},
                        //       icon: Icon(
                        //         IconlyLight.search,
                        //         size: 30,
                        //       ),
                        //       label: Text(''),
                        //     ),
                        //   ],
                        // ),
                      ],
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    // Container(
                    //   height: 250,
                    //   decoration: BoxDecoration(
                    //     borderRadius: BorderRadius.circular(15),
                    //   ),
                    //   width: double.infinity,
                    //   child: Row(
                    //     children: [
                    //       SizedBox(
                    //         width: 70,
                    //         child: CircleAvatar(
                    //           backgroundImage:
                    //               AssetImage('assets/images/profile.png'),
                    //           backgroundColor: Kmaincolor500,
                    //           maxRadius: 30,
                    //         ),
                    //       ),
                    //       SizedBox(
                    //         width: MediaQuery.of(context).size.width - 110,
                    //         child: Column(children: [
                    //           TextField(
                    //             autocorrect: true,
                    //             decoration: InputDecoration(
                    //               hintText: 'Title',
                    //               hintStyle: TextStyle(
                    //                   color: Color.fromARGB(255, 255, 255, 255)),
                    //               filled: true,
                    //               fillColor: Color.fromARGB(179, 68, 68, 68),
                    //             ),
                    //           ),
                    //           SizedBox(height: 5),
                    //           TextField(
                    //             maxLines: 3,
                    //             autocorrect: true,
                    //             decoration: InputDecoration(
                    //               hintText: 'msg',
                    //               hintStyle: TextStyle(
                    //                   color: Color.fromARGB(255, 255, 255, 255)),
                    //               filled: true,
                    //               fillColor: Color.fromARGB(179, 68, 68, 68),
                    //             ),
                    //           ),
                    //           SizedBox(height: 5),
                    //           TextField(
                    //             autocorrect: true,
                    //             decoration: InputDecoration(
                    //               hintText: 'Tags',
                    //               hintStyle: TextStyle(
                    //                   color: Color.fromARGB(255, 255, 255, 255)),
                    //               filled: true,
                    //               fillColor: Color.fromARGB(179, 68, 68, 68),
                    //             ),
                    //           ),
                    //           SizedBox(height: 5),
                    //           Row(
                    //             mainAxisAlignment: MainAxisAlignment.end,
                    //             children: [
                    //               Icon(Icons.photo_album_outlined),
                    //               SizedBox(
                    //                 width: 10,
                    //               ),
                    //               ElevatedButton(
                    //                   onPressed: () {}, child: Text("POST")),
                    //             ],
                    //           ),
                    //         ]),
                    //       ),
                    //     ],
                    //   ),
                    // ),
                    const SizedBox(
                      height: 15,
                    ),
                    Divider(),
                    const SizedBox(
                      height: 10,
                    ),
                    GestureDetector(
                      onTap: () {},
                      child: Padding(
                        padding: const EdgeInsets.only(right: 15),
                        child: Padding(
                          padding: const EdgeInsets.only(
                              left: 10, top: 10, bottom: 10),
                          child: GestureDetector(
                            onTap: () {},
                            child: Container(
                              height: 360,
                              width: MediaQuery.of(context).size.width - 15,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(25),
                                color: Colors.white,
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.grey.withOpacity(0.3),
                                    spreadRadius: 5,
                                    blurRadius: 5,
                                    offset: Offset(
                                        0, 2), // changes position of shadow
                                  ),
                                ],
                              ),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Align(
                                    alignment: Alignment.topLeft,
                                    child: Padding(
                                      padding: const EdgeInsets.only(
                                          left: 15.0, top: 15),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            "User Name",
                                            style: KH2,
                                            textAlign: TextAlign.left,
                                          ),
                                          Padding(
                                            child: Icon(
                                              Icons.delete,
                                              color: Colors.redAccent,
                                            ),
                                            padding: EdgeInsets.only(right: 10),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  Align(
                                    alignment: Alignment.topLeft,
                                    child: Padding(
                                      padding: const EdgeInsets.only(
                                          left: 15.0, top: 2, bottom: 8),
                                      child: Column(
                                        children: [
                                          Text("10m ago"),
                                        ],
                                      ),
                                    ),
                                  ),
                                  ClipRRect(
                                    borderRadius: BorderRadius.only(
                                      topLeft: const Radius.circular(25.0),
                                      topRight: const Radius.circular(25.0),
                                    ),
                                    child: Image.asset('assets/head.png'),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.all(10),
                                    child: Row(
                                      children: [
                                        Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              'Title title title',
                                              style: KH3,
                                              maxLines: 3,
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                            SizedBox(
                                              width: 400,
                                              child: Text(
                                                'This is body This is body This is body ',
                                                style: KP1,
                                                maxLines: 10,
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                            SizedBox(
                                              height: 10,
                                            ),
                                            Row(
                                              children: [
                                                Icon(Icons.thumb_up),
                                                SizedBox(
                                                  width: 10,
                                                ),
                                                Text("10 Likes"),
                                                SizedBox(
                                                  width: 95,
                                                ),
                                                Icon(Icons.message_outlined),
                                                GestureDetector(
                                                  child: Text("10 Comments"),
                                                  onTap: () {
                                                    bottomshet(context);
                                                  },
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),

                                        // Text(
                                        //   '¥5000',
                                        //   style: KH2,
                                        // )
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                  ],
                )),
          ),
        ),
        bottomNavigationBar: bottombar(context),
        floatingActionButton: new FloatingActionButton(
            elevation: 0.0,
            child: new Icon(Icons.add_circle),
            backgroundColor: new Color(0xFFE57373),
            onPressed: () {
              addnewpost(context);
            }));
  }
}

addnewpost(context) {
  showModalBottomSheet(
      context: context,
      builder: (context) {
        return Container(
          padding: EdgeInsets.all(10.0),
          height: 250,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
          ),
          width: double.infinity,
          child: Row(
            children: [
              SizedBox(
                width: 70,
                child: CircleAvatar(
                  backgroundImage: AssetImage('assets/images/profile.png'),
                  backgroundColor: Kmaincolor500,
                  maxRadius: 30,
                ),
              ),
              SizedBox(
                width: MediaQuery.of(context).size.width - 110,
                child: Column(children: [
                  TextField(
                    autocorrect: true,
                    decoration: InputDecoration(
                      hintText: 'Title',
                      hintStyle:
                          TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
                      filled: true,
                      fillColor: Color.fromARGB(179, 68, 68, 68),
                    ),
                  ),
                  SizedBox(height: 5),
                  TextField(
                    maxLines: 3,
                    autocorrect: true,
                    decoration: InputDecoration(
                      hintText: 'msg',
                      hintStyle:
                          TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
                      filled: true,
                      fillColor: Color.fromARGB(179, 68, 68, 68),
                    ),
                  ),
                  SizedBox(height: 5),
                  TextField(
                    autocorrect: true,
                    decoration: InputDecoration(
                      hintText: 'Tags',
                      hintStyle:
                          TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
                      filled: true,
                      fillColor: Color.fromARGB(179, 68, 68, 68),
                    ),
                  ),
                  SizedBox(height: 5),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Icon(Icons.photo_album_outlined),
                      SizedBox(
                        width: 10,
                      ),
                      ElevatedButton(onPressed: () {}, child: Text("POST")),
                    ],
                  ),
                ]),
              ),
            ],
          ),
        );
      });
}

bottomshet(context) {
  showModalBottomSheet(
      context: context,
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                alignment: Alignment.topLeft,
                height: 50,
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Align(
                        alignment: Alignment.center,
                        child: Text("Comments", style: KH1),
                      ),
                    ]),
              ),
              SizedBox(
                height: 20,
              ),
              Container(
                alignment: Alignment.topLeft,
                height: 50,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Align(
                      alignment: Alignment.topLeft,
                      child: Text("Username", style: KH3),
                    ),
                    Align(
                        alignment: Alignment.topLeft,
                        child: Text("This is comment sdsadas dsa sd dsa")),
                  ],
                ),
              ),
              Container(
                alignment: Alignment.topLeft,
                height: 50,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Align(
                      alignment: Alignment.topLeft,
                      child: Text("Username", style: KH3),
                    ),
                    Align(
                        alignment: Alignment.topLeft,
                        child: Text("This is comment sdsadas dsa sd dsa")),
                  ],
                ),
              ),
              Container(
                alignment: Alignment.topLeft,
                height: 50,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    SizedBox(
                      child: TextField(
                        autocorrect: true,
                        decoration: InputDecoration(
                          hintText: 'Enter your command',
                          hintStyle: TextStyle(
                              color: Color.fromARGB(255, 255, 255, 255)),
                          filled: true,
                          fillColor: Color.fromARGB(179, 68, 68, 68),
                        ),
                      ),
                      width: MediaQuery.of(context).size.width - 90,
                    ),
                    SizedBox(
                      width: 5,
                    ),
                    Icon(
                      Icons.arrow_circle_right_outlined,
                      size: 50,
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      });
}
