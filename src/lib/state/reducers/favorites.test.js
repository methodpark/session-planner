import { reducer } from '../state';
import {
  initFavorites, INIT_FAVORITES,
  setFavorite, SET_FAVORITE,
  unsetFavorite, UNSET_FAVORITE
} from './favorites';


describe("redux state handling", () => {

  describe("initFavorites", () => {
    it("returns an action with the given list", () => {
      const favorites = [23, 42, 666];

      const action = initFavorites(favorites);

      expect(action).toEqual({ type: INIT_FAVORITES, favorites });
    });
  });

  describe("setFavorite", () => {
    it("returns an action with the given id", () => {
      const id = 23;

      const action = setFavorite(id);

      expect(action).toEqual({ type: SET_FAVORITE, id });
    });
  });

  describe("unsetFavorite", () => {
    it("returns an action with the given id", () => {
      const id = 23;

      const action = unsetFavorite(id);

      expect(action).toEqual({ type: UNSET_FAVORITE, id });
    });
  });
});


describe('favorites', () => {

  describe("when called with an initFavorites action", () => {

    const favorites = [23, 42, 666];
    const action = initFavorites(favorites);

    describe("when no favorites exist yet", () => {
      it("stores the given favorites", () => {
        const state = {};

        const newState = reducer(state, action);

        expect(newState.favorites).toEqual(favorites);
      });
    });

    describe("when favorites in state already exist", () => {
      it("overwrites them with the given favorites", () => {
        const state = { favorites: [1, 2] };

        const newState = reducer(state, action);

        expect(newState.favorites).toEqual(favorites);
      });
    });

    describe("when init action carries no favorites", () => {
      it("sets the favorites in the state to the empty list", () => {
        const state = { favorites: null };
        const actionWithoutFavs = initFavorites(null);

        const newState = reducer(state, actionWithoutFavs);

        expect(newState.favorites).toEqual([]);
      });
    });

  });

  describe("when called with a setFavorite action", () => {

    const id = 42
    const action = setFavorite(id);

    describe("when no favorites exist yet", () => {
      it("stores the session id as favorite", () => {
        const state = {};

        const newState = reducer(state, action);

        expect(newState.favorites).toContain(id);
      });
    });

    describe("when favorites are empty", () => {
      it("stores the session id as favorite", () => {
        const state = { favorites: [] };

        const newState = reducer(state, action);

        expect(newState.favorites).toContain(id);
      });
    });

    describe("when other favorites exist", () => {
      it("stores the session id as favorite", () => {
        const state = { favorites: [23, 1337] };

        const newState = reducer(state, action);

        expect(newState.favorites).toContain(id);
      });
    });

    describe("when the id is already stored as one of many favorites", () => {
      const state = { favorites: [23, id, 1337] };

      it("keeps the id in the list of favorites", () => {
        const newState = reducer(state, action);

        expect(newState.favorites).toContain(id);
      });

      it("does not add the id a second time to the list", () => {
        const initialNumberOfFavorites = state.favorites.length;

        const newState = reducer(state, action);

        expect(newState.favorites).toHaveLength(initialNumberOfFavorites);
      });
    });

  });

  describe("when called with an unsetFavorite action", () => {

    const id = 42
    const action = unsetFavorite(id);

    describe("when no favorites exist yet", () => {
      it("initializes the favorites to an empty list", () => {
        const state = {};

        const newState = reducer(state, action);

        expect(newState.favorites).toEqual([]);
      });
    });

    describe("when favorites are empty", () => {
      it("does nothing", () => {
        const state = { favorites: [] };

        const newState = reducer(state, action);

        expect(newState.favorites).toEqual(state.favorites);
      });
    });

    describe("when other favorites exist", () => {
      it("does nothing", () => {
        const state = { favorites: [23, 1337] };

        const newState = reducer(state, action);

        expect(newState.favorites).toEqual(state.favorites);
      });
    });

    describe("when the id is stored as one of many favorites", () => {
      it("removes the id from the list of favorites", () => {
        const state = { favorites: [23, id, 1337] };

        const newState = reducer(state, action);

        expect(newState.favorites).not.toContain(id);
      });
    });

    describe("when the id is stored as the only favorites", () => {
      it("empties the list of favorites", () => {
        const state = { favorites: [id] };

        const newState = reducer(state, action);

        expect(newState.favorites).toEqual([]);
      });
    });
  });

});