import React from 'react';
import Group from '@jetbrains/ring-ui/components/group/group';
import Badge from '@jetbrains/ring-ui/components/badge/badge';
import Button from '@jetbrains/ring-ui/components/button/button';
import ButtonGroup from '@jetbrains/ring-ui/components/button-group/button-group';
import ButtonToolbar from '@jetbrains/ring-ui/components/button-toolbar/button-toolbar';
import Code from '@jetbrains/ring-ui/components/code/code';
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown';
import Popup from '@jetbrains/ring-ui/components/popup/popup';
import Island, {
	Header,
	Content
} from '@jetbrains/ring-ui/components/island/island';

const App = () => (
	<>
		<Group>
			<Badge>Simple</Badge>
			<Badge gray>Gray</Badge>
		</Group>
		<ButtonToolbar>
			<Button primary delayed>
				Run
			</Button>
			<ButtonGroup>
				<Button>Button one</Button>
				<Button>Button two</Button>
				<Button disabled="disabled">Button three</Button>
			</ButtonGroup>
			<Button>Another action</Button>
		</ButtonToolbar>
		<Code
			code={`
                    import React, {Component} from 'react';
                    import ChildComponent from './child-component';

                    const MyComponent = () => (
                        <div className="class">
                            <ChildComponent prop="value" />
                        </div>
                    );
        `}
		/>
		<Dropdown anchor="Click me">
			<Popup>Popup content</Popup>
		</Dropdown>
		<Island narrow className="limited-island">
			<Header border>Title</Header>
			<Content fade>
				{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
			</Content>
		</Island>
	</>
);

export default App;
