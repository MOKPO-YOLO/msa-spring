CREATE TABLE BOARD(
	IDX INT NOT NULL AUTO_INCREMENT,
	TITLE VARCHAR(100) NOT NULL,
	CONTENT VARCHAR(2000) NOT NULL,
	WRITER VARCHAR(30) NOT NULL,
	INDATE DATETIME DEFAULT NOW(),
	COUNT INT DEFAULT 0,
	PRIMARY KEY(IDX)
);


SELECT * FROM BOARD;



-- test 데이터 넣기
insert into member(memId, memPassword, memName, memAge, memGender, memEmail)
values('admin', '1234', '관리자', 20, '여자', 'admin@gmail.com');
insert into member(memId, memPassword, memName, memAge, memGender, memEmail)
values('smart', '1234', '스마트', 30, '남자', 'smart@gmail.com');
insert into member(memId, memPassword, memName, memAge, memGender, memEmail)
values('juhee', '1111', '이주희', 19, '여자', 'juhee@gmail.com');



-- yoloray table
select * from COMPANY;
select * from Notice;
select * from WORKLOAD;
select * from MEMBER;

select * from COMPANY where IDENTIFI_ID='123456';

insert into MEMBER(MEMBER_ID, MEMBER_NAME, MEMBER_AUTH)
values('456789', 'jinhee oh', 'ture');
insert into MEMBER(MEMBER_ID, MEMBER_NAME, MEMBER_AUTH)
values('test1', '손채영', 'ture');
insert into MEMBER(MEMBER_ID, MEMBER_NAME, MEMBER_AUTH)
values('test2', '오종원', 'ture');


INSERT INTO Notice(NOTICE_TITLE, NOTICE_DETAIL)
VALUES('2건발견','yoloray성능이 너무 좋습니다');
INSERT INTO Notice(NOTICE_TITLE, NOTICE_DETAIL)
VALUES('4건발견','권총이 탐지되었습니다.');
INSERT INTO Notice(NOTICE_TITLE, NOTICE_DETAIL)
VALUES('3','마약 탐지되었습니다.');



insert into COMPANY(IDENTIFI_ID, COMPANY_NAME, COMPANY_PW)
values('123456', 'nexon', 'jini');


INSERT INTO WORKLOAD (MEMBER_ID, WORK_NUM, WORK_PRESENCE)
VALUES('456789', 60, 'Y');
INSERT INTO WORKLOAD (MEMBER_ID, WORK_NUM, WORK_PRESENCE)
VALUES('test1', 80, 'Y');
INSERT INTO WORKLOAD (MEMBER_ID, WORK_NUM, WORK_PRESENCE)
VALUES('test1', 120, 'Y');
INSERT INTO WORKLOAD (MEMBER_ID, WORK_NUM, WORK_PRESENCE)
VALUES('test1', 100, 'Y');
INSERT INTO WORKLOAD (MEMBER_ID, WORK_NUM, WORK_PRESENCE)
VALUES('test2', 150, 'Y');
INSERT INTO WORKLOAD (MEMBER_ID, WORK_AT, WORK_NUM, WORK_PRESENCE)
VALUES('test2', '2024-02-12', 250, 'Y');
INSERT INTO WORKLOAD (MEMBER_ID, WORK_AT, WORK_NUM, WORK_PRESENCE)
VALUES('456789', '2024-02-18', 50, 'Y');
INSERT INTO WORKLOAD (MEMBER_ID, WORK_AT, WORK_NUM, WORK_PRESENCE)
VALUES('test2', '2024-02-22', 160, 'Y');



SELECT * FROM WORKLOAD ORDER BY WORK_AT DESC;


-- 트리거 상태 확인
SELECT trigger_name, status
FROM user_triggers
WHERE trigger_name = 'WORKLOAD_AI_TRG';

-- 트리거 컴파일 오류 확인
SELECT text
FROM user_errors
WHERE name = 'WORKLOAD_AI_TRG';


-- 월별로 탐지물품 건수 합산 쿼리 
-- ex1)
SELECT
    TO_CHAR(WORK_AT, 'YYYY-MM') AS month,
    SUM(WORK_NUM) AS total_work
FROM WORKLOAD
GROUP BY TO_CHAR(WORK_AT, 'YYYY-MM');


-- ex2)
SELECT
    TO_CHAR(WORK_AT, 'MM') AS month,
    SUM(WORK_NUM) AS total_work
FROM WORKLOAD
GROUP BY TO_CHAR(WORK_AT, 'MM');
