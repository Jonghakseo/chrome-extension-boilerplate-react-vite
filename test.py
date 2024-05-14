# -*- coding: utf-8 -*-
# UTF-8 encoding when using korean

# 나무 N그루, x y 좌표와 hi로 높이.

# 어떤 방향에서 바라보아도 보이지 않는 나무 수.
# 4초

# 정렬하고 하는 것이 맞나...? 
# N = 100,000. NlogN : 대충 1,400,000

# 가장 높은 나무가 갱신되면 가리는 것이니 높은 나무 순서로 정렬

# 다른 모든 쪽에서 안보이는 방법: 한 나무보다 더 큰 높이가 좌표(가로,세로)에 둘 다 있으면 안됨.
# simple하게는 N^2이면 끝남.

# 원본
# N = int(input())
# trees = [0]* (N)
# for i in range(N):
# 	trees[i] = tuple(map(int, input().split(" ")))
# 테스트
print("1차")
N = 100000
trees = [0]* (N)
for i in range(N):	
	trees[i] = (i, i, i)

west_set = set()
east_set = set()
south_set = set()
north_set = set()
# x가 같고, y가 다른 거

trees.sort(key=lambda x:( x[1], x[0], -x[2]))
prev_max_h = 1
for i in range(1, N):	
	prev_x, prev_y, prev_h = trees[i-1]	
	x, y, h = trees[i]
	
	if prev_y != y:
		prev_max_h = h	
	else:
		if prev_max_h > h:
			print(f"서쪽: {x} {y} {h}")		
			west_set.add((x, y, h))
		elif prev_max_h < h:
			prev_max_h = h
		
		
trees.sort(key=lambda x:( x[1], -x[0], -x[2]))
prev_max_h = 1
for i in range(1, N):	
	prev_x, prev_y, prev_h = trees[i-1]	
	x, y, h = trees[i]
	
	if prev_y != y:
		prev_max_h = h
	else:		
		if prev_max_h > h:
			print(f"동쪽: {x} {y} {h}")		
			east_set.add((x, y, h))
		elif prev_max_h < h:
			prev_max_h = h

		
trees.sort(key=lambda x:(x[0], x[1], -x[2]))
prev_max_h = 1
for i in range(1, N):	
	prev_x, prev_y, prev_h = trees[i-1]	
	x, y, h = trees[i]
	
	if prev_x != x:
		prev_max_h = h
	else:		
		if prev_max_h > h:
			print(f"남쪽: {x} {y} {h}")		
			south_set.add((x, y, h))
		elif prev_max_h < h:
			prev_max_h = h
			
trees.sort(key=lambda x:(x[0], -x[1], -x[2]))
prev_max_h = 1
for i in range(1, N):	
	prev_x, prev_y, prev_h = trees[i-1]	
	x, y, h = trees[i]
	
	if prev_x != x:
		prev_max_h = h
	else:		
		if prev_max_h > h:
			print(f"북쪽: {x} {y} {h}")		
			north_set.add((x, y, h))
		elif prev_max_h < h:
			prev_max_h = h

		
candidates_count = len(west_set & east_set & south_set & north_set)
print(candidates_count)




		
		
			
		
	
	
	
	


	
	
