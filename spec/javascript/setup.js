import Enzyme, {mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import sinon from 'sinon'

Enzyme.configure({adapter: new Adapter()})

global.mount = mount
global.React = React
global.shallow = shallow
global.sinon = sinon
