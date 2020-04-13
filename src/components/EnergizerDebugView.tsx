/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card, Button, Row, Col, Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useGame } from './StoreContext';
import { eatEnergizer } from '../lib/eatEnergizer';
import { VSpace } from './Spacer';

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const EnergizerDebugView: FC<{ className?: string }> = observer(
  ({ className }) => {
    const game = useGame();
    return (
      <Layout className="EnergizerDebugView">
        <Card title="Energizer" size="small">
          <Row>
            <Col flex="0 0 auto">
              <div>
                Time left:{' '}
                {formatter.format(game.energizerTimer.timeLeft / 1000)} seconds
              </div>
            </Col>

            <Col flex="0 0 48px"></Col>

            <Col flex="0 0 auto">
              <Button
                size="small"
                shape="round"
                onClick={() => {
                  eatEnergizer(game);
                }}
              >
                Eat Energizer
              </Button>
            </Col>
          </Row>
        </Card>
      </Layout>
    );
  }
);

const Layout = styled.div`
  margin-right: 24px;
`;
