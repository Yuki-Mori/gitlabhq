import Vue from 'vue';
import issuePlaceholderNote from '~/notes/components/issue_placeholder_note.vue';
import store from '~/notes/stores';
import { userDataMock } from '../mock_data';

describe('issue placeholder system note component', () => {
  let vm;

  beforeEach(() => {
    const Component = Vue.extend(issuePlaceholderNote);
    store.dispatch('setUserData', userDataMock);
    vm = new Component({
      store,
      propsData: { note: { body: 'Foo' } },
    }).$mount();
  });

  afterEach(() => {
    vm.$destroy();
  });

  describe('user information', () => {
    it('should render user avatar with link', () => {
      expect(vm.$el.querySelector('.user-avatar-link').getAttribute('href')).toEqual(userDataMock.path);
      expect(vm.$el.querySelector('.user-avatar-link img').getAttribute('src')).toEqual(userDataMock.avatar_url);
    });
  });

  describe('note content', () => {
    it('should render note header information', () => {
      expect(vm.$el.querySelector('.note-header-info a').getAttribute('href')).toEqual(userDataMock.path);
      expect(vm.$el.querySelector('.note-header-info .note-headline-light').textContent.trim()).toEqual(`@${userDataMock.username}`);
    });

    it('should render note body', () => {
      expect(vm.$el.querySelector('.note-text p').textContent.trim()).toEqual('Foo');
    });
  });
});
