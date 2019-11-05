<?php

namespace Yoast\WP\Free\Tests\Presentations\Indexable_Date_Archive_Presentation;

use Yoast\WP\Free\Tests\TestCase;

/**
 * Class Rel_Prev_Test.
 *
 * @group presentations
 * @group adjacent
 *
 * @coversDefaultClass \Yoast\WP\Free\Presentations\Indexable_Date_Archive_Presentation
 */
class Rel_Prev_Test extends TestCase {
	use Presentation_Instance_Builder;

	/**
	 * Sets up the test class.
	 */
	public function setUp() {
		parent::setUp();

		$this->setInstance();
	}

	/**
	 * Tests the situation where the rel adjacent is disabled.
	 *
	 * @covers ::generate_rel_prev
	 */
	public function test_generate_rel_prev_is_disabled() {
		$this->pagination
			->expects( 'is_rel_adjacent_disabled' )
			->once()
			->andReturn( true );

		$this->assertEmpty( $this->instance->generate_rel_prev() );
	}

	/**
	 * Tests the situation where the current page is the first page.
	 *
	 * @covers ::generate_rel_prev
	 */
	public function test_generate_rel_prev_is_first_page() {
		$this->pagination
			->expects( 'is_rel_adjacent_disabled' )
			->once()
			->andReturn( false );

		$this->pagination
			->expects( 'get_current_archive_page_number' )
			->once()
			->andReturn( 1 );

		$this->assertEmpty( $this->instance->generate_rel_prev() );
	}

	/**
	 * Tests the situation where the previous page is the first page.
	 *
	 * @covers ::generate_rel_prev
	 */
	public function test_generate_rel_prev_is_second_page() {
		$this->instance->canonical = 'https://example.com/canonical/';

		$this->pagination
			->expects( 'is_rel_adjacent_disabled' )
			->once()
			->andReturn( false );

		$this->pagination
			->expects( 'get_current_archive_page_number' )
			->once()
			->andReturn( 2 );

		$this->assertEquals( 'https://example.com/canonical/', $this->instance->generate_rel_prev() );
	}

	/**
	 * Tests the situation where the current page is the third (or more) page.
	 *
	 * @covers ::generate_rel_prev
	 */
	public function test_generate_rel_prev_is_third_page() {
		$this->instance->canonical = 'https://example.com/2019/11/page/2/';

		$this->pagination
			->expects( 'is_rel_adjacent_disabled' )
			->once()
			->andReturn( false );

		$this->pagination
			->expects( 'get_current_archive_page_number' )
			->once()
			->andReturn( 3 );

		$this->pagination
			->expects( 'get_paginated_url' )
			->with( 'https://example.com/2019/11/', 2 )
			->once()
			->andReturn( 'https://example.com/2019/11/page/2/' );

		$this->current_page_helper
			->expects( 'get_date_archive_permalink' )
			->once()
			->andReturn( 'https://example.com/2019/11/' );

		$this->assertEquals( 'https://example.com/2019/11/page/2/', $this->instance->generate_rel_prev() );
	}
}
