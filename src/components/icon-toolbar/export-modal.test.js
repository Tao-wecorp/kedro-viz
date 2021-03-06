import React from 'react';
import ExportModal, { exportGraph, mapStateToProps } from './export-modal';
import { mockState, setup } from '../../utils/state.mock';

describe('IconToolbar', () => {
  it('renders without crashing', () => {
    const wrapper = setup.mount(<ExportModal />);
    expect(wrapper.find('.pipeline-icon-modal').length).toBe(1);
  });

  it('maps state to props', () => {
    const expectedResult = {
      graphSize: expect.objectContaining({
        height: expect.any(Number),
        width: expect.any(Number),
        marginx: expect.any(Number),
        marginy: expect.any(Number)
      }),
      theme: expect.stringMatching(/light|dark/)
    };
    expect(mapStateToProps(mockState.lorem)).toEqual(expectedResult);
  });

  describe('exportGraph', () => {
    const graphSize = {
      width: 1000,
      height: 500,
      marginx: 40,
      marginy: 40
    };

    beforeEach(() => {
      document.body.innerHTML = `
        <svg id="pipeline-graph">
          <g id="zoom-wrapper" />
        </svg>
      `;
    });

    it('downloads an SVG', () => {
      const downloadFn = jest.fn();
      exportGraph(downloadFn, 'svg', 'dark', graphSize);
      expect(downloadFn.mock.calls.length).toBe(1);
    });

    it('downloads a PNG', () => {
      const downloadFn = jest.fn();
      exportGraph(downloadFn, 'png', 'dark', graphSize);
      expect(downloadFn.mock.calls.length).toBe(1);
    });

    it('erases the cloned SVG node', () => {
      expect(document.querySelectorAll('svg').length).toBe(1);
    });
  });
});
