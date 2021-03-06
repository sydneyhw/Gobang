	    // UI部分
	    var over = false;
	    var chess = document.getElementById('chess');
	    var context = chess.getContext('2d');
	    var me = "true"
	    var chessBoard = new Array();
	    for (var i = 0; i < 15; i++) {
	    	chessBoard[i] = [];
	    	for (var j = 0; j < 15; j++) {
	    		chessBoard[i][j] = 0; //初始化，将棋盘所有落子位置都设置成0
	    	}
	    }

	    function drawChessBoard() {
	    	for (var i = 0; i < 15; i++) {
	    		context.moveTo(15 + i * 30, 15);
	    		context.lineTo(15 + i * 30, 435);
	    		context.moveTo(15, 15 + i * 30);
	    		context.lineTo(435, 15 + i * 30);
	    	}
	    	context.lineWidth = 2;
	    	context.strokeStyle = "#ACACAC";
	    	context.stroke();
	    }

	    function oneStep(i, j, me) {
	    	context.beginPath();
	    	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	    	context.closePath();
	    	var gradient = context.createRadialGradient(15 + i * 30, 15 + j * 30, 0, 15 + i * 30, 15 + j * 30, 13);
	    	if (me) {
	    		gradient.addColorStop(0, '#636766');
	    		gradient.addColorStop(1, '#0a0a0a');
	    	} else {
	    		gradient.addColorStop(0, '#F9F9F9');
	    		gradient.addColorStop(1, '#d1d1d1');
	    	}
	    	context.fillStyle = gradient;
	    	context.fill();
	    }

	    var logo = new Image();
	    logo.src = "image/avatar.png";
	    logo.onload = function() {
	    	context.drawImage(logo, 165, 165, 100, 100);
	    	drawChessBoard();
	    }
	    chess.onclick = function(e) {
	    	if (over) {
	    		return;
	    	}
	    	if (!me) {
	    		return;
	    	}
	    	// offsetX和offsetY这两个方法，是用于取得鼠标点击的位置
	    	var x = e.offsetX;
	    	var y = e.offsetY;
	    	var i = Math.floor(x / 30);
	    	var j = Math.floor(y / 30);
	    	if (chessBoard[i][j] == 0) {
	    		oneStep(i, j, me);
	    		chessBoard[i][j] = 1;
	    		for (var k = 0; k < count; k++) {
	    			if (wins[i][j][k]) {
	    				myWin[k]++;
	    				comWin[k] = 6;
	    				if (myWin[k] == 5) {
	    					window.alert("你赢了！");
	    					over = true;
	    				}
	    			}
	    		}
	    		if (!over) {
	    			me = !me;
	    			comAI();
	    		}
	    	}
	    }


	    // AI部分
	    //1.赢法数组
	    var wins = [];
	    for (var i = 0; i < 15; i++) {
	    	wins[i] = [];
	    	for (var j = 0; j < 15; j++) {
	    		wins[i][j] = [];
	    	}
	    }
	    var count = 0;
	    for (var i = 0; i < 15; i++) { //i表遍历所有的行。
	    	for (var j = 0; j < 11; j++) { //j表示的是五个子连在一起时，首个子所在的行的位置。
	    		for (var k = 0; k < 5; k++) { //k用来控制是五个子连接到一块。
	    			wins[i][j + k][count] = true;
	    		}
	    		count++;
	    	}
	    }
	    for (var i = 0; i < 15; i++) { //i表遍历所有的列。
	    	for (var j = 0; j < 11; j++) { //j表示的是五个子连在一起时，首个子所在的列的位置。
	    		for (var k = 0; k < 5; k++) { //k用来控制是五个子连接到一块。
	    			wins[j + k][i][count] = true;
	    		}
	    		count++;
	    	}
	    }
	    for (var i = 0; i < 11; i++) {
	    	for (var j = 0; j < 11; j++) {
	    		for (var k = 0; k < 5; k++) {
	    			wins[i + k][j + k][count] = true;
	    		}
	    		count++;
	    	}
	    }
	    for (var i = 0; i < 11; i++) {
	    	for (var j = 14; j > 3; j--) {
	    		for (var k = 0; k < 5; k++) {
	    			wins[i + k][j - k][count] = true;
	    		}
	    		count++;
	    	}
	    }

	    // 2.赢法统计数组
	    var myWin = [];
	    var comWin = [];
	    for (var i = 0; i < count; i++) {
	    	myWin[i] = 0;
	    	comWin[i] = 0;
	    }

	    var comAI = function() {
	    	var myScore = [];
	    	var max = 0;
	    	var u = 0,
	    		v = 0;
	    	var computerScore = [];
	    	for (var i = 0; i < 15; i++) {
	    		myScore[i] = [];
	    		computerScore[i] = [];
	    		for (var j = 0; j < 15; j++) {
	    			myScore[i][j] = 0;
	    			computerScore[i][j] = 0;
	    		}
	    	}
	    	for (var i = 0; i < 15; i++) {
	    		for (var j = 0; j < 15; j++) {
	    			if (chessBoard[i][j] == 0) {
	    				for (var k = 0; k < count; k++) {
	    					if (wins[i][j][k]) {
	    						if (myWin[k] == 1) {
	    							myScore[i][j] += 200;
	    						} else if (myWin[k] == 2) {
	    							myScore[i][j] += 400;
	    						} else if (myWin[k] == 3) {
	    							myScore[i][j] += 2000;
	    						} else if (myWin[k] == 4) {
	    							myScore[i][j] += 20000;
	    						}
	    						if (comWin[k] == 1) {
	    							computerScore[i][j] += 220;
	    						} else if (comWin[k] == 2) {
	    							computerScore[i][j] += 420;
	    						} else if (comWin[k] == 3) {
	    							computerScore[i][j] += 2200;
	    						} else if (comWin[k] == 4) {
	    							computerScore[i][j] += 20000;
	    						}
	    					}
	    				}
	    			}
	    			if (myScore[i][j] > max) {
	    				max = myScore[i][j];
	    				u = i;
	    				v = j;
	    			}

	    			if (computerScore[i][j] > max) {
	    				max = computerScore[i][j];
	    				u = i;
	    				v = j;
	    			}

	    		}
	    	}
	    	oneStep(u, v, false);
	    	chessBoard[u][v] = 2;
	    	for (var k = 0; k < count; k++) {
	    		if (wins[u][v][k]) {
	    			comWin[k]++;
	    			myWin[k] = 6;
	    			if (comWin[k] == 5) {
	    				window.alert("计算机赢了！");
	    				over = true;
	    			}
	    		}
	    	}
	    	if (!over) {
	    		me = !me;
	    	}
	    }