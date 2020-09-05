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
	
	map(element, props)
	{
		if (props.constructor === Array)
		{
			let elems = [];
			for (var eachProps in props)
			{
				let elem = new Element(element, props[eachProps]);
				elems.push(elem);
			}
			this.add(elems);
			return elems;
		}
		else
		{
			let elem = new Element(element, props);
			this.add(elem);
			return elem;
		}	
	}
	
}

class Element
{
	constructor(tag,  props='')
	{
		this.tag = tag;
		this.props = new Object();
		this.html = document.getElementsByTagName(tag)[0].innerHTML;
		
		if (props!='')
		{
			this.set(props);
		}
	}
	
	set(props)
	{
		if (typeof props == 'object' && !Array.isArray(props))
		{
			for (var prop in props)
				{
					this.props[prop] = props[prop];
				}
		}
		else
		{
			if (Array.isArray(props))
			{
				// get all variables
				let vars = [];
				let tempHtml = this.html;
		
				while (tempHtml.indexOf('{{')!==-1)
					{
						let thisVar = tempHtml.split('{{')[1].split('}}')[0];
						
						if (thisVar.indexOf('if:')!==-1)
							thisVar = thisVar.split('if:')[1].split('}}')[0];
						
						if (vars.indexOf(thisVar)===-1)
							vars.push(thisVar);
						tempHtml = tempHtml.replace('{{', '');
					}
					
				let varN = -1;

				for (var prop in props)
				{
					varN++;
					this.props[vars[varN]] = props[prop];
				}

			}
			else
			{
				let firstVar = this.html.split('{{')[1].split('}}')[0];
				if (firstVar.indexOf('if:')!==-1)
						firstVar = firstVar.split('if:')[1].split('=')[0];
				
				this.props[firstVar] = props;
			}
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
		
		// replace all empty variables
		while (html.indexOf('{{')!==-1)
		{
			let x1 = html.indexOf('{{');
			let x2 = html.indexOf('}}');
			
			let firstPart = html.substr(0, x1);
			let secondPart = html.substr(x2 + 2);
			
			html = firstPart + secondPart;
		}

		return html;
	}
}