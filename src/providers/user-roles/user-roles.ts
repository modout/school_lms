//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { UserRole } from '../../models/user.role.interface'

@Injectable()
export class UserRolesProvider {

USER_ROLES: string[][] =
[
	['Admin', 'Office', 'Principal', 'null', 'null', '0'],
	['Admin', 'Office', 'Front Desk', 'null', 'null', '1'],
	['Admin', 'School', 'Buildings', 'null', 'null', '2'],
	['Admin', 'School', 'Grounds', 'null', 'null', '3'],
	['Admin', 'School', 'Discipline', 'null', 'null', '4'],
	['Admin', 'School', 'Data', 'All', 'null', '5'],
	['Admin', 'School', 'Data', 'Content', 'null', '6'],
	['Admin', 'School', 'Data', 'Reports', 'null', '7'],
	['Admin', 'School', 'Data', 'Timetable', 'null', '8'],
	['Admin', 'School', 'Data', 'Subjects', 'null', '9'],
	['Admin', 'School', 'Data', 'Classes', 'null', '10'],
	['Admin', 'School', 'IT', 'null', 'null', '11'],
	['Admin', 'School', 'Library', 'Manager', 'null', '12'],
	['Admin', 'School', 'Library', 'Librarian', 'null', '13'],
	['Admin', 'Finance', 'Manager', 'null', 'null', '14'],
	['Admin', 'Finance', 'Book-keeper', 'null', 'null', '15'],
	['Admin', 'Finance', 'Accountant', 'null', 'null', '16'],
	['Admin', 'Finance', 'Auditor', 'null', 'null', '17'],
	['Management', 'School', 'Principal', 'null', 'null', '18'],
	['Management', 'School', 'HOD', 'null', 'null', '19'],
	['Management', 'School', 'SGB', 'null', 'null', '20'],
	['Management', 'Provincial', 'District Office', 'Director', 'null', '21'],
	['Management', 'Provincial', 'District Office', 'Subject Advisor', 'FET', '22'],
	['Management', 'Provincial', 'District Office', 'Subject Advisor', 'ECD', '23'],
	['Management', 'Provincial', 'District Office', 'Subject Advisor', 'GED', '24'],
	['Management', 'Provincial', 'District Office', 'Teacher Development', 'null', '25'],
	['Management', 'Provincial', 'District Office', 'E Learning', 'null', '26'],
	['Management', 'Provincial', 'Head Office', 'MEC', 'null', '27'],
	['Management', 'Provincial', 'Head Office', 'HOD', 'null', '28'],
	['Management', 'Provincial', 'Head Office', 'DDG', 'null', '29'],
	['Management', 'Provincial', 'Head Office', 'Spokesperson', 'null', '30'],
	['Management', 'National', 'Minister', 'null', 'null', '31'],
	['Management', 'National', 'DG', 'null', 'null', '32'],
	['Management', 'National', 'DDG', 'null', 'null', '33'],
	['Management', 'National', 'HOD', 'null', 'null', '34'],
	['Management', 'National', 'Spokesperson', 'null', 'null', '35'],
	['Support', 'Core', 'Data', 'Admin', 'null', '36'],
	['Support', 'Core', 'Data', 'Analyst', 'null', '37'],
	['Support', 'Core', 'Data', 'Developer', 'null', '38'],
	['Support', 'Core', 'Data', 'Architect', 'null', '39'],
	['Support', 'Core', 'System', 'Admin', 'null', '40'],
	['Support', 'Core', 'System', 'Analyst', 'null', '41'],
	['Support', 'Core', 'System', 'Developer', 'null', '42'],
	['Support', 'Core', 'System', 'Architect', 'null', '43'],
	['Support', 'Core', 'User', 'Admin', 'null', '44'],
	['Support', 'Core', 'User', 'Analyst', 'null', '45'],
	['Support', 'Core', 'User', 'Developer', 'null', '46'],
	['Support', 'Core', 'User', 'Architect', 'null', '47'],
	['Support', 'Core', 'Security', 'Admin', 'null', '48'],
	['Support', 'Core', 'Security', 'Analyst', 'null', '49'],
	['Support', 'Core', 'Security', 'Developer', 'Architect', '50'],
	['Support', 'Core', 'App', 'Admin', 'null', '51'],
	['Support', 'Core', 'App', 'Analyst', 'null', '52'],
	['Support', 'Core', 'App', 'Developer', 'null', '53'],
	['Support', 'Core', 'App', 'Architect', 'null', '54'],
	['Support', 'Schools', 'null', 'null', 'null', '55'],
	['Support', 'Users', 'null', 'null', 'null', '56'],
	['Support', 'Devices', 'null', 'null', 'null', '57'],
	['School', 'Details', 'null', 'null', 'null', '58'],
	['School', 'Server', 'null', 'null', 'null', '59'],
	['School', 'SmartBoard', 'null', 'null', 'null', '60'],
	['School', 'Laptop', 'null', 'null', 'null', '73'],
	['School', 'Tablet', 'null', 'null', 'null', '74'],
	['Training', 'Trainer', 'null', 'null', 'null', '61'],
	['Training', 'Trainee', 'null', 'null', 'null', '62'],
	['Learner', 'null', 'null', 'null', 'null', '63'],
	['Teacher', 'null', 'null', 'null', 'null', '64'],
	['Parent', 'null', 'null', 'null', 'null', '65'],
	['Value Added Services', 'Content', 'TendoPro', 'null', 'null', '66'],
	['Value Added Services', 'Hardware', 'null', 'null', 'null', '67'],
	['Value Added Services', 'Transport', 'null', 'null', 'null', '68'],
	['Value Added Services', 'Cleaning', 'null', 'null', 'null', '69'],
	['Value Added Services', 'Software', 'null', 'null', 'null', '70'],
	['Value Added Services', 'Equipment', 'null', 'null', 'null', '71'],
	['Value Added Services', 'Finance', 'INAM', 'null', 'null', '72'],
	
]

SCHOOLS: string[] = 
[
	'SUNWARD PARK HIGH SCHOOL',
	'MERENSKY HIGH SCHOOL',
	'VUTOMI HIGH SCHOOL',
	'VUWANI SECONDARY SCHOOL',
	'VUYANI PRIMARY SCHOOL',
	'VUYO PRIMARY SCHOOL',
	'WALLMANSTHAL SECONDARY SCHOOL',
	'WALTER SISULU PRIMARY SCHOOL',
	'WALTON JAMESON PRIMARY SCHOOL',
	'WATERKLOOF CHRISTIAN COLLEGE',
	'WATERKLOOF HOUSE PREPARATORY',
	'WATERKLOOF PRIMARY SCHOOL',
	'WATERSHED PRIVATE SCHOOL',
	'WATERSHED TECHNICAL SCHOOL',
	'WATERSONG LEARNING CENTRE'

]

GRADES: string[] =
[
	'Grade R',
	'Grade 1',
	'Grade 2',
	'Grade 3',
	'Grade 4',
	'Grade 5',
	'Grade 6',
	'Grade 7',
	'Grade 8',
	'Grade 9',
	'Grade 10',
	'Grade 11',
	'Grade 12'
]


SUBJECTS: string[] =
[
'CREATIVE ARTS',
'AFRIKAANS',
'EMS',
'ENGLISH',
'LIFE ORIENTATION',
'MATHEMATICS',
'NATURAL SCIENCES',
'GEOGRAPHY (J-GEO)',
'TECHNOLOGY',
'ACCOUNTING',
'AFRIKAANS FIRST ADDITIONAL LAN',
'VISUAL ARTS',
'BUSINESS STUDIES',
'CIVIL TECHNOLOGY',
'COMPUTER APPLICATIONS TECHNOLO',
'CONSUMER STUDIES',
'ECONOMICS',
'ENGINEERING GRAPHICS AND DESIG',
'ENGLISH HOME LANGUAGE',
'GEOGRAPHY',
'HISTORY',
'LIFE SCIENCES',
'MATHEMATICAL LITERACY',
'PHYSICAL SCIENCES',
'RELIGION STUDIES',
'TOURISM',
'HISTORY [J-HIS]',
'SOCIAL SCIENCES',
'AFRIKAANS FIRST ADD LANG',
'REGISTRATION',
'LO Sport',
'Afrikaans',
'Life Orientation',
'LO Sport',
'LO',
'English',
'Zulu',
'SchoolLMS Training',
'Religious Studies'
]


  constructor(){}

  
 
}
