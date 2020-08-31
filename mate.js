/* mateJS */
document.getElementsByTagName('elements')[0].style.display = 'none';

class Container
{
	constructor(div)
	{
		this.div = div;
		this.container = document.getElementById(div);
		this.elements = [];
	}
	
	add(element)
	{
		if (element.constructor === Array)
		{
			for (var eachElement in element)
			{
				this.elements.push(element[eachElement]);
			}
		}
		else
		{
			this.elements.push(element);
		}
	}
	
	remove(element)
	{
		if (element.constructor === Array)
		{
			for (var eachElement in element)
			{
				delete this.elements[this.elements.indexOf(element[eachElement])];
			}
		}
		else
		{
			delete this.elements[this.elements.indexOf(element)];
		}		
	}
	
	clearElements()
	{
		this.elements = [];
	}
	
	render()
	{
		this.container.innerHTML = '';
		
		for (var element in this.elements)
		{
			this.container.innerHTML += this.elements[element].getHtml();
		}		
	}
}

class Element
{
	constructor(tag)
	{
		this.tag = tag;
		this.props = new Object();
		this.html = document.getElementsByTagName(tag)[0].innerHTML;
	}
	
	set(props)
	{

		for (var prop in props)
		{
			this.props[prop] = props[prop];
		}
		
	}

	getHtml()
	{
		let html = this.html;
		
		// search filters	
		while (html.indexOf('{{endif}}')!=-1)
		{
			let condStart = html.indexOf('{{if:');
			let condEnd = html.indexOf('{{endif}}');
			
			let cond = html.substr(condStart, condEnd + 9 - condStart);
		
			let condProp = cond.substr(5, cond.indexOf('=') - 5);
			let condIf = cond.substr(cond.indexOf('=') + 1, cond.indexOf('}') - cond.indexOf('=') - 1);
			
			let result = cond.substr(cond.indexOf('}}') + 2, cond.length - cond.indexOf('}}') - 2 - 9);

			// check condition
			if (this.props[condProp]==condIf)
				html = html.split(cond).join(result);
			else
				html = html.split(cond).join('');

		}
		
		for (var prop in this.props)
		{
			html = html.split('{{'+prop+'}}').join(this.props[prop]);
		}

		return html;
	}
}