package challenge

import (
	"testing"

	"github.com/freiny/go-util/ftest"
)

func ReverseString(s string) string {
	return s
}

func TestReverseString(t *testing.T) {
	tests := []ftest.Test{
		{1, ReverseString(""), ""},
		{2, ReverseString("abc"), "cba"},
		{3, ReverseString(" ab c."), ".c ba "},
	}
	ftest.Assert(t, tests, func(s string) { t.Errorf(s) })
}
