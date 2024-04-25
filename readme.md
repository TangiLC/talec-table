<p align='center'>⚠️ This Repository is for Educational purpose and might not be maintained ⚠️  </p>

🔴 Attention: This repository is not actively maintained or updated. This is a component created for the project 14 of the Open Classrooms Javascript-React Dev course : [Faites passer une librairie jQuery vers React](https://openclassrooms.com/fr/paths/516/projects/815). Thank you for your understanding and support! 💻🙌.

---

<p align="center">
  <img src="./readme-examples/react-native.png?raw=true" width="150" />
</p>

<h1 align="center">React Native Table Component</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/*"><img src="https://img.shields.io/badge/npm-v_7.24.1-orange?style&logo=npm" /></a>
</p>
<br/>

This is a table component for react native.

- [Minimal Settings](#Minimal)
  - [Lines Data](#Lines)
  - [Titles Data](#Titles)
  - [Hide Data](#Hide)
- [Custom Settings](#Custom)
  - [Custom Styles](#Style)
  - [Custom Columns](#Columns)
  - [Custom Actions](#Actions)
  - [Custom Labels](#Labels)
  - [Custom Length](#Length)
  - [Custom Search](#Search)
- [Properties](#Properties)
- [Notice](#Notice)
- [License](#License)

## Minimal Settings

<p id="Minimal" align="center">The minimal requirement for this component are the <b>data array</b>, and a <b>title object</b> sharing keys with the data array.

> npm install talec-table

### Lines

<p id="Lines">for this whole readme file I will use a data array of super heroes to create lines.</p>

```jsx
const myData = [
  {FN:"Peter",LN:"Parker",AL:"SpiderMan",D1:"1962-08-01",CO:"Red",SY:"🕷",WE:76,UN:"Marvel"},
	...];
```

### Titles

<p id="Titles">The Titles object defines the header line of the array. Keys must be the same as data Lines. It is independent from data, thus enabling titles to be responsively changed if the display language changes for instance.</p>

```jsx
const myTitles = {
	FN: "1st Name",
	LN: "Last Name",
	AL: "Alias",
	D1: "#1 Comic",
	CO: "Color",
	SY: "Symbol",
	WE: "Weight",
	UN: "Universe",
};
```

<p align="center">With this minimal setting, you get the below example display, with sorting, search function and pagination.</p>

`USE:`

```jsx
import React from "react";
import {TalecTable} from "talec-table";

import myData from "path";

function myPage(){
  const myTitles = {
    FN: "1st Name", LN: "Last Name", AL: "Alias", D1: "#1 Comic",
    CO: "Color", SY: "Symbol", WE: "Weight",	UN: "Universe"};

  return(
    <div><TalecTable lines={myData} titles={myTitles}/><div>
  )
}
```

<img src="./readme-examples/minimal.png?raw=true" width="800"/>

<p align="center"><i>Minimal display with no custom style or action</i></p>
<br/><br/>

### Hide

<p align="center" id="Hide">You might want to hide a column without editing your data, the prop <b>Hide</b> has this purpose. Hide is an array of keys that will not be displayed</p>

`USE:`

```jsx
import React from "react";
import { TalecTable } from "talec-table";

import myData from "path";

function myPage() {
	const myTitles = {
		FN: "1st Name",
		LN: "Last Name",
		AL: "Alias",
		D1: "#1 Comic",
		CO: "Color",
		SY: "Symbol",
		WE: "Weight",
		UN: "Universe",
	};
	const dataToHide = ["CO", "UN"];

	return (
		<div>
			<TalecTable lines={myData} titles={myTitles} hide={dataToHide} />
		</div>
	);
}
```

<img src="./readme-examples/hide.png?raw=true" width="800"/>
<p align="center"><i>Minimal display with hidden columns</i></p>
<br/>

## Custom Settings

<p align="center">A lot of customization is allowed through the <b>custom</b> prop, please see list and examples below

### Styles

By passing a css object in the <i>custom</i> prop, you can change the display of the lines. The keys
<b>titleStyle</b>, <b>evenLineStyle</b> and <b>oddLineStyle</b> are the targets.

```jsx
const myCustom = {
	titleStyle: { backgroundColor: "lightskyblue" },
	evenLineStyle: { backgroundColor: "lightblue" },
	oddLineStyle: { backgroundColor: "lightcyan" },
};
```

`USE:`

```jsx
import React from "react";
import { TalecTable } from "talec-table";

import myData from "path";
import myTitles from "path";

function myPage() {
	const myCustom = {
		titleStyle: { backgroundColor: "lightskyblue" },
		evenLineStyle: { backgroundColor: "lightblue" },
		oddLineStyle: { backgroundColor: "lightcyan" },
	};

	return (
		<div>
			<TalecTable lines={myData} titles={myTitles} custom={myCustom} />
		</div>
	);
}
```

<img src="./readme-examples/style.png?raw=true" width="800"/>
<p align="center"><i>Customized display with personalized style</i></p>
<br/>

### Columns

You might want to change the order of the columns, and define a custom width for each. The prop <b>custom.columns</b> is here for you. Only the keys included in <i>values</i> will be displayed, therefor you can either choose to use the previous prop <i>hide</i> with the full list of keys, or just shorten the list here. Make sure your total width do not exceed 100%...

```jsx
const myColumns = {
	columns: {
		values: ["UN", "D1", "LN", "FN", "AL", "SY", "CO"],
		width: ["10%", "", "15%", "15%", "15%", "8%", "6rem"],
	},
};
```

`USE:`

```jsx
import React from "react";
import { TalecTable } from "talec-table";

import myData from "path";
import myTitles from "path";

function myPage() {
	const myColumns = {
		columns: {
			values: ["UN", "D1", "LN", "FN", "AL", "SY", "CO"],
			width: ["10%", "", "15%", "15%", "15%", "8%", "6rem"],
		},
	};

	return (
		<div>
			<TalecTable lines={myData} titles={myTitles} custom={myColumns} />
		</div>
	);
}
```

<img src="./readme-examples/columns.png?raw=true" width="800"/>
<p align="center"><i>Customized display with personalized columns</i></p>
<br/>

### Actions

<p id='Actions'>Need to add an extra column at the end of your table, that triggers a function in the parent component ? The prop <b>custom.actionColumn</b> serves this purpose. the <i>name</i> is the title of this column, <i>label</i> is shown on mouse over the <i>icon</i>. The function <i>func()</i> is called in parent component on click, passing the value of the <i>target</i> column. Actions is a list, therefor multiples icons might be displayed for multiples functions.</p>

```jsx
const customAction = {
	actionColumn: {
		name: "Actions",
		actions: [
			{
				icon: <BsTrash3Fill />,
				func: deleteItem,
				target: "AL",
				label: "delete",
			},
		],
	},
};
```

`USE:`

```jsx
import React from "react";
import { TalecTable } from "talec-table";
import { BsTrash3Fill } from "react-icons/bs";

import myData from "path";
import myTitles from "path";

function myPage() {
	const deleteItem = (item) => {
		//your logic here
		console.log(item);
	};

	const customAction = {
		actionColumn: {
			name: "Actions",
			actions: [
				{
					icon: <BsTrash3Fill />,
					func: deleteItem,
					target: "AL",
					label: "delete",
				},
			],
		},
	};

	return (
		<div>
			<TalecTable lines={myData} titles={myTitles} custom={customAction} />
		</div>
	);
}
```

<img src="./readme-examples/actions.png?raw=true" width="800"/>
<p align="center"><i>Customized display with personalized action column</i></p>
<br/>

---

### Labels

<p id='Labels'>You might want to change the displayed text for length selector, search input or pagination information. the <b>custom.text</b> prop is there for this purpose.</p>

```jsx
const customText = {
	text: {
		itemPerPage: "How many Heros per page ? ",
		search: "Seeking help ?",
		showingItems: ["Digging Hero #", "to", "out of"],
	},
};
```

`USE:`

```jsx
import React from "react";
import { TalecTable } from "talec-table";

import myData from "path";
import myTitles from "path";

function myPage() {
	const customText = {
		text: {
			itemPerPage: "How many Heros per page ? ",
			search: "Seeking help ?",
			showingItems: ["Digging Hero #", "to", "out of"],
		},
	};

	return (
		<div>
			<TalecTable lines={myData} titles={myTitles} custom={customText} />
		</div>
	);
}
```

<img src="./readme-examples/text.png?raw=true" width="800"/>

<p align="center"><i>Display with custom text</i></p>
<br/><br/>

### Pagination Length

<p id='Length'>The default page length let user choose between 10,20 or 50 items per page. You might want to change that, using the prop <b>custom.lengthChoice</b>.</p>

```jsx
const customLength = { lengthChoice: [6, 12, 25, 60] };
```

`USE:`

```jsx
import React from "react";
import { TalecTable } from "talec-table";

import myData from "path";
import myTitles from "path";

function myPage() {
	const customLength = { lengthChoice: [6, 12, 25, 60] };

	return (
		<div>
			<TalecTable lines={myData} titles={myTitles} custom={customLength} />
		</div>
	);
}
```

<img src="./readme-examples/length.png?raw=true" width="800"/>
<p align="center"><i>Display with custom length selection</i></p>
<br/><br/>

### Narrowing search

<p id='Search'>The default search tool includes every column in the search, and starts filtering after 2 characters typed. If you want to narrow the results to fewer columns, use the <b>custom.searchCol</b> prop.</p>

```jsx
const customSearch = { searchCol: ["AL", "CO"] };
```

`USE:`

```jsx
import React from "react";
import { TalecTable } from "talec-table";

import myData from "path";
import myTitles from "path";

function myPage() {
	const customSearch = { searchCol: ["AL", "CO"] };

	return (
		<div>
			<TalecTable lines={myData} titles={myTitles} custom={customSearch} />
		</div>
	);
}
```

<img src="./readme-examples/search.png?raw=true" width="800"/>
<p align="center"><i>The search will be narrowed to selected columns</i></p>
<br/><br/>

---

<p id='Properties'>&nbsp;</p>

## Properties

| Prop                        | Type   | Description                                | Default                                                                                                                   |
| --------------------------- | ------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| <b>lines</b>                | Array  | Users data                                 | `null`                                                                                                                    |
| <b>titles</b>               | Object | Table header names                         | `null`                                                                                                                    |
| <b>hide</b>                 | Object | Table data to hide.                        | `null`                                                                                                                    |
| custom.<b>search</b>        | Array  | Columns to search into                     | `titles`                                                                                                                  |
| custom.<b>length</b>        | Array  | Selection of page display length           | `[10,20,50]`                                                                                                              |
| custom.<b>labels</b>        | Object | Text for labels around Table               | `{itemPerPage: "Items per Page :", search: "Search :", showingItems: ["Showing items", "to", "out of"]  }`                |
| custom.<b>actions</b>       | Object | Actions functions and icons in last column | `null`                                                                                                                    |
| custom.<b>columns</b>       | Object | Order and width of columns                 | `null`                                                                                                                    |
| custom.<b>titleStyle</b>    | Style  | CSS object to define Title style           | `{backgroundColor: "#fefefe",borderBottom: "1px solid #cccccc",lineHeight: "2rem",fontWeight: "600",textAlign: "center"}` |
| custom.<b>evenLineStyle</b> | Style  | CSS object to define Even Lines style      | `{backgroundColor: "#eeeeee",borderBottom: "1px solid #dddddd",lineHeight:"1.8rem"}`                                      |
| custom.<b>oddLineStyle</b>  | Style  | CSS object to define Odd Lines style       | `{backgroundColor: "#fdfdfd",borderBottom: "1px solid #dddddd",lineHeight:"1.8rem"}`                                      |

---

<br/><br/>

<p id="Notice">&nbsp;</p>

## Notice

<p id="License">&nbsp;</p>

## License

[MIT](LICENSE)
