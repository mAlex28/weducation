import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/style/colors.dart';
import 'package:mobile/style/textstyle.dart';
import 'package:mobile/widget/bottemnavbar.dart';
import 'package:url_launcher/url_launcher.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _baseUrl = 'http://192.168.1.29:5000/posts';

  int _page = 1;
  bool _hasNextPage = true;
  bool _isFirstLoadRunning = false;
  bool _isLoadMoreRunning = false;
  List _allposts = [];

  void _firstLoad() async {
    setState(() {
      _isFirstLoadRunning = true;
    });
    try {
      final res = await http.get(Uri.parse("$_baseUrl?page=$_page"));
      setState(() {
        var bodyData = json.decode(res.body);
        _allposts = bodyData['data'];
      });
    } catch (err) {
      print('Something went wrong');
    }

    setState(() {
      _isFirstLoadRunning = false;
    });
  }

  // This function will be triggered whenver the user scroll
  // to near the bottom of the list view
  void _loadMore() async {
    if (_hasNextPage == true &&
        _isFirstLoadRunning == false &&
        _isLoadMoreRunning == false &&
        _controller.position.extentAfter < 300) {
      setState(() {
        _isLoadMoreRunning = true;
      });
      _page += 1;
      try {
        final res = await http.get(Uri.parse("$_baseUrl?_page=$_page"));

        final List fetchedPosts = json.decode(res.body);
        if (fetchedPosts.isNotEmpty) {
          setState(() {
            _allposts.addAll(fetchedPosts);
          });
        } else {
          setState(() {
            _hasNextPage = false;
          });
        }
      } catch (err) {
        print('load Something went wrong!');
      }

      setState(() {
        _isLoadMoreRunning = false;
      });
    }
  }

  void _launchEmail(url) async {
    var newUrl = Uri.parse(url);
    if (await canLaunchUrl(newUrl)) {
      await launchUrl(newUrl);
    } else {
      throw 'Could not launch $url';
    }
  }

  void _launchPhoneCall(url) async {
    var newUrl = Uri.parse(url);

    if (await canLaunchUrl(newUrl)) {
      await launchUrl(newUrl);
    } else {
      throw 'Could not launch $url';
    }
  }

  // The controller for the ListView
  late ScrollController _controller;

  @override
  void initState() {
    _firstLoad();
    _controller = ScrollController()..addListener(_loadMore);
    super.initState();
  }

  @override
  void dispose() {
    _controller.removeListener(_loadMore);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            children: [
              SizedBox(
                child: const TextField(
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
              const SizedBox(
                width: 5,
              ),
              const Icon(
                Icons.search,
                size: 30,
              ),
            ],
          ),
        ),
      ),
      backgroundColor: const Color(0xfff1f2f6),
      bottomNavigationBar: bottombar(context),
      floatingActionButton: FloatingActionButton(
          elevation: 0.0,
          child: new Icon(Icons.add_circle),
          backgroundColor: new Color(0xFFE57373),
          onPressed: () {
            addnewpost(context);
          }),
      body: _isFirstLoadRunning
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    controller: _controller,
                    itemCount: _allposts.length,
                    itemBuilder: (_, index) => Padding(
                      padding: const EdgeInsets.only(
                          top: 8.0, left: 8.0, right: 8.0),
                      child: GestureDetector(
                        onTap: () {
                          // Navigator.push(
                          //     context,
                          //     MaterialPageRoute(
                          //         builder: (context) => CompanyProfilePage(
                          //               citizen: _companies[index],
                          //             )));
                        },
                        child: Card(
                          elevation: 4,
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: <Widget>[
                              ListTile(
                                title: Text(_allposts[index]['name']),
                                subtitle: Text(_allposts[index]['createdAt']),
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
                                        const SizedBox(
                                          height: 10,
                                        ),
                                        Padding(
                                            padding: const EdgeInsets.all(10.0),
                                            child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment.start,
                                                children: List.from(
                                                  _allposts[index]['tags'].map(
                                                    (value) => Text(
                                                      '$value,',
                                                      style: const TextStyle(
                                                          color: Colors.grey),
                                                      maxLines: 2,
                                                      overflow:
                                                          TextOverflow.ellipsis,
                                                      softWrap: false,
                                                    ),
                                                  ),
                                                ))),
                                        Row(
                                          children: [
                                            const Icon(Icons.thumb_up),
                                            const SizedBox(
                                              width: 10,
                                            ),
                                            Text(_allposts[index]['likes']),
                                            const SizedBox(
                                              width: 95,
                                            ),
                                            const Icon(Icons.message_outlined),
                                            GestureDetector(
                                              child: Text(
                                                  _allposts[index]['comments']),
                                              onTap: () {
                                                bottomshet(context);
                                              },
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
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

                // when the _loadMore function is running
                if (_isLoadMoreRunning == true)
                  const Padding(
                    padding: EdgeInsets.only(top: 10, bottom: 40),
                    child: Center(
                      child: CircularProgressIndicator(),
                    ),
                  ),

                // When nothing else to load
                if (_hasNextPage == false)
                  Container(
                    padding: const EdgeInsets.only(top: 30, bottom: 40),
                    color: Colors.amber,
                    child: const Center(
                      child: Text('All companies are fetched'),
                    ),
                  ),
              ],
            ),
    );
  }
}

addnewpost(context) {
  showModalBottomSheet(
      context: context,
      builder: (context) {
        return Container(
          padding: const EdgeInsets.all(10.0),
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
                  backgroundImage:
                      const AssetImage('assets/images/profile.png'),
                  backgroundColor: Kmaincolor500,
                  maxRadius: 30,
                ),
              ),
              SizedBox(
                width: MediaQuery.of(context).size.width - 110,
                child: Column(children: [
                  const TextField(
                    autocorrect: true,
                    decoration: InputDecoration(
                      hintText: 'Title',
                      hintStyle:
                          TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
                      filled: true,
                      fillColor: const Color.fromARGB(179, 68, 68, 68),
                    ),
                  ),
                  const SizedBox(height: 5),
                  const TextField(
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
                  const SizedBox(height: 5),
                  const TextField(
                    autocorrect: true,
                    decoration: InputDecoration(
                      hintText: 'Tags',
                      hintStyle:
                          TextStyle(color: Color.fromARGB(255, 255, 255, 255)),
                      filled: true,
                      fillColor: Color.fromARGB(179, 68, 68, 68),
                    ),
                  ),
                  const SizedBox(height: 5),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      const Icon(Icons.photo_album_outlined),
                      const SizedBox(
                        width: 10,
                      ),
                      ElevatedButton(
                          onPressed: () {}, child: const Text("POST")),
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
              const SizedBox(
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
                    const Align(
                        alignment: Alignment.topLeft,
                        child:
                            const Text("This is comment sdsadas dsa sd dsa")),
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
                    const Align(
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
                      child: const TextField(
                        autocorrect: true,
                        decoration: const InputDecoration(
                          hintText: 'Enter your command',
                          hintStyle: const TextStyle(
                              color: Color.fromARGB(255, 255, 255, 255)),
                          filled: true,
                          fillColor: Color.fromARGB(179, 68, 68, 68),
                        ),
                      ),
                      width: MediaQuery.of(context).size.width - 90,
                    ),
                    const SizedBox(
                      width: 5,
                    ),
                    const Icon(
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
